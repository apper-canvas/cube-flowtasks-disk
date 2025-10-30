import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "@/components/molecules/TaskCard";
import TaskModal from "@/components/organisms/TaskModal";
import DeleteConfirmModal from "@/components/organisms/DeleteConfirmModal";
import Empty from "@/components/ui/Empty";
import { useTasks } from "@/hooks/useTasks";

const TaskList = ({ tasks, searchQuery, onCreateTask }) => {
  const { updateTask, deleteTask, toggleTaskComplete, reorderTasks } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [taskModalLoading, setTaskModalLoading] = useState(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);

  // Setup drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    // Create new order array
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(oldIndex, 1);
    newTasks.splice(newIndex, 0, movedTask);

    // Extract task IDs in new order
    const taskIds = newTasks.map((task) => task.id);
    
    // Update order via hook
    reorderTasks(taskIds);
  };
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteClick}
                />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

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