import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import FilterBar from "@/components/organisms/FilterBar";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/organisms/TaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";

const Dashboard = () => {
  const { tasks, loading, error, createTask, retryLoad } = useTasks();
  const { 
    filters, 
    updateFilter, 
    clearFilters, 
    filteredAndSortedTasks, 
    taskStats 
  } = useTaskFilters(tasks);
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalLoading, setCreateModalLoading] = useState(false);

  const handleCreateTask = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleSubmitCreate = async (taskData) => {
    try {
      setCreateModalLoading(true);
      await createTask(taskData);
      setCreateModalOpen(false);
    } finally {
      setCreateModalLoading(false);
    }
  };

  const handleClearSearch = () => {
    updateFilter("searchQuery", "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Error message={error} onRetry={retryLoad} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Header 
            taskStats={taskStats} 
            onCreateTask={handleCreateTask} 
          />
          
          <FilterBar
            filters={filters}
            onUpdateFilter={updateFilter}
            taskStats={taskStats}
            onClearSearch={handleClearSearch}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <TaskList
              tasks={filteredAndSortedTasks}
              searchQuery={filters.searchQuery}
              onCreateTask={handleCreateTask}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Create Task Modal */}
      <TaskModal
        isOpen={createModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitCreate}
        loading={createModalLoading}
      />
    </div>
  );
};

export default Dashboard;