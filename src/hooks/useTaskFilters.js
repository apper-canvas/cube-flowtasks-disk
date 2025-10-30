import { useState, useMemo } from "react";
import { format, isAfter, isBefore, startOfDay } from "date-fns";

export const useTaskFilters = (tasks) => {
  const [filters, setFilters] = useState({
    status: "all", // all, active, completed
    sortBy: "priority", // priority, dueDate, createdAt
    searchQuery: "",
    selectedCategory: null
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      sortBy: "priority",
      searchQuery: "",
      selectedCategory: null
    });
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Filter by category
    if (filters.selectedCategory) {
      filtered = filtered.filter(task => task.category === filters.selectedCategory);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
          if (priorityDiff !== 0) return priorityDiff;
          // If same priority, sort by due date (earliest first)
          if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          if (a.dueDate) return -1;
          if (b.dueDate) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "dueDate":
          // Tasks with no due date go to the end
          if (!a.dueDate && !b.dueDate) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);

        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt);

        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, filters]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === "completed").length;
    const active = total - completed;
    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.status === "completed") return false;
      return isBefore(new Date(task.dueDate), startOfDay(new Date()));
    }).length;
    const dueToday = tasks.filter(task => {
      if (!task.dueDate || task.status === "completed") return false;
      const today = startOfDay(new Date());
      const taskDate = startOfDay(new Date(task.dueDate));
      return taskDate.getTime() === today.getTime();
    }).length;

    return {
      total,
      completed,
      active,
      overdue,
      dueToday,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [tasks]);

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredAndSortedTasks,
    taskStats
  };
};