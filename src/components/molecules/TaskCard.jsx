import React from "react";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, isAfter, isBefore, startOfDay, isToday } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import { useCategories } from "@/hooks/useCategories";
const TaskCard = React.forwardRef(({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  className 
}, forwardedRef) => {
  const { getCategoryById, getCategoryColor } = useCategories();
  const category = getCategoryById(task.category);
  const categoryColor = getCategoryColor(task.category);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleToggleComplete = async () => {
    await onToggleComplete(task.id);
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const startToday = startOfDay(today);
    const startDueDate = startOfDay(dueDate);
    
    if (task.status === "completed") {
      return {
        text: `Completed ${format(new Date(task.completedAt), "MMM d")}`,
        variant: "success",
        icon: "CheckCircle"
      };
    }
    
    if (isBefore(dueDate, startToday)) {
      return {
        text: `Overdue (${format(dueDate, "MMM d")})`,
        variant: "danger",
        icon: "AlertCircle"
      };
    }
    
    if (isToday(dueDate)) {
      return {
        text: "Due Today",
        variant: "warning",
        icon: "Clock"
      };
    }
    
    return {
      text: format(dueDate, "MMM d"),
      variant: "outline",
      icon: "Calendar"
    };
  };

  const dueDateInfo = getDueDateInfo();

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high": return "high";
      case "medium": return "medium";
      case "low": return "low";
      default: return "low";
    }
  };

return (
    <motion.div
      ref={(node) => {
        setNodeRef(node);
        if (forwardedRef) {
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else {
            forwardedRef.current = node;
          }
        }
      }}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-elevation group",
        task.status === "completed" && "opacity-75",
        isDragging && "opacity-50 cursor-grabbing z-50",
        !isDragging && "cursor-grab",
        className
      )}
      style={{
        borderLeftColor: categoryColor,
        borderLeftWidth: "4px",
        ...style
      }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="mt-1"
        >
          <Checkbox
            checked={task.status === "completed"}
            onChange={handleToggleComplete}
            className="w-5 h-5"
          />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn(
              "font-semibold text-gray-900 text-lg",
              task.status === "completed" && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 ml-4">
              <div className={cn("priority-dot", getPriorityColor())} />
              {dueDateInfo && (
                <Badge variant={dueDateInfo.variant} size="sm" className="flex items-center gap-1">
                  <ApperIcon name={dueDateInfo.icon} size={12} />
                  {dueDateInfo.text}
                </Badge>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-gray-600 text-sm leading-relaxed mb-3",
              task.status === "completed" && "text-gray-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {category && (
                <Badge variant="outline" size="sm" className="flex items-center gap-1">
                  <ApperIcon name={category.icon} size={12} style={{ color: categoryColor }} />
                  {category.name}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <ApperIcon name="Edit2" size={14} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete task"
              >
                <ApperIcon name="Trash2" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
</motion.div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;