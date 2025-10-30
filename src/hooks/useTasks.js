import { useState, useEffect, useCallback } from "react";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully!");
      return newTask;
    } catch (err) {
      const errorMessage = err.message || "Failed to create task";
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      toast.success("Task updated successfully!");
      return updatedTask;
    } catch (err) {
      const errorMessage = err.message || "Failed to update task";
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      const errorMessage = err.message || "Failed to delete task";
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const toggleTaskComplete = useCallback(async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      
      if (updatedTask.status === "completed") {
        toast.success("🎉 Task completed! Great job!", {
          autoClose: 2000,
        });
      } else {
        toast.info("Task reopened");
      }
      
      return updatedTask;
    } catch (err) {
      const errorMessage = err.message || "Failed to update task status";
toast.error(errorMessage);
      throw err;
    }
  }, []);

  const reorderTasks = useCallback(async (taskIds) => {
    try {
      // Optimistically update local state
      setTasks(prev => {
        const taskMap = {};
        prev.forEach(task => {
          taskMap[task.id] = task;
        });
        return taskIds.map(id => taskMap[id]).filter(Boolean);
      });
      
      // Persist to service
      await taskService.reorderTasks(taskIds);
      toast.success("Tasks reordered successfully!");
    } catch (err) {
      const errorMessage = err.message || "Failed to reorder tasks";
      toast.error(errorMessage);
      // Reload tasks to restore correct order on failure
      await loadTasks();
      throw err;
    }
  }, [loadTasks]);
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const retryLoad = useCallback(() => {
    loadTasks();
  }, [loadTasks]);

  return {
tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    reorderTasks,
    retryLoad
  };
};