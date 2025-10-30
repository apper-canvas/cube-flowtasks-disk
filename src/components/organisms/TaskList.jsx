import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import TaskModal from "@/components/organisms/TaskModal";
import DeleteConfirmModal from "@/components/organisms/DeleteConfirmModal";
import Empty from "@/components/ui/Empty";
import { useTasks } from "@/hooks/useTasks";

const TaskList = ({ tasks, searchQuery, onCreateTask }) => {
  const { updateTask, deleteTask, toggleTaskComplete } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [taskModalLoading, setTaskModalLoading] = useState(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);

  const deletingTask = tasks.find(task => task.id === deletingTaskId);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseTaskModal = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;
    
    try {
      setTaskModalLoading(true);
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } finally {
      setTaskModalLoading(false);
    }
  };

  const handleDeleteClick = (taskId) => {
    setDeletingTaskId(taskId);
  };

  const handleCloseDeleteModal = () => {
    setDeletingTaskId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTaskId) return;
    
    try {
      setDeleteModalLoading(true);
      await deleteTask(deletingTaskId);
      setDeletingTaskId(null);
    } finally {
      setDeleteModalLoading(false);
    }
  };

  if (tasks.length === 0) {
    const emptyProps = searchQuery
      ? {
          title: "No tasks found",
          description: `No tasks match "${searchQuery}". Try adjusting your search.`,
          icon: "Search",
          actionLabel: "Clear Search",
          onAction: () => window.location.reload()
        }
      : {
          title: "No tasks yet",
          description: "Get started by adding your first task and stay organized!",
          icon: "CheckSquare",
          actionLabel: "Add Your First Task",
          onAction: onCreateTask
        };

    return <Empty {...emptyProps} />;
  }

  return (
    <>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <TaskCard
                task={task}
                onToggleComplete={toggleTaskComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Task Edit Modal */}
      <TaskModal
        isOpen={!!editingTask}
        onClose={handleCloseTaskModal}
        onSubmit={handleUpdateTask}
        task={editingTask}
        loading={taskModalLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingTaskId}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        taskTitle={deletingTask?.title || ""}
        loading={deleteModalLoading}
      />
    </>
  );
};

export default TaskList;