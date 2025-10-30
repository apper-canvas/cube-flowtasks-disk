import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { useCategories } from "@/hooks/useCategories";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  task = null, 
  loading = false 
}) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "personal",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        category: task.category || "personal",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category: "personal",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    try {
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <FormField
              label="Task Title"
              required
              error={errors.title}
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="What needs to be done?"
            />

            <FormField
              label="Description"
              error={errors.description}
            >
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add more details about this task..."
                rows={3}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Priority"
                error={errors.priority}
              >
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </Select>
              </FormField>

              <FormField
                label="Category"
                error={errors.category}
              >
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            <FormField
              label="Due Date"
              error={errors.dueDate}
              helperText="Leave empty if no due date"
            >
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </FormField>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                loading={loading}
              >
                {task ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;