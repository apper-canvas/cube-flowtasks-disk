import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressRing from "@/components/molecules/ProgressRing";

const Header = ({ taskStats, onCreateTask }) => {
  return (
    <header className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center"
            >
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">FlowTasks</h1>
              <p className="text-gray-600">Organize your tasks efficiently</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ProgressRing 
              progress={taskStats.completionRate} 
              size={60} 
              strokeWidth={5}
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">
                {taskStats.completed} of {taskStats.total} completed
              </p>
              <p className="text-gray-600">
                {taskStats.active} active tasks
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onCreateTask}
          className="flex items-center gap-2"
          size="lg"
        >
          <ApperIcon name="Plus" size={20} />
          Add Task
        </Button>
      </div>
      
      {/* Stats Bar */}
      {(taskStats.overdue > 0 || taskStats.dueToday > 0) && (
        <div className="mt-4 flex gap-4">
          {taskStats.overdue > 0 && (
            <div className="flex items-center gap-2 text-red-600">
              <ApperIcon name="AlertCircle" size={16} />
              <span className="text-sm font-medium">
                {taskStats.overdue} overdue task{taskStats.overdue !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {taskStats.dueToday > 0 && (
            <div className="flex items-center gap-2 text-amber-600">
              <ApperIcon name="Clock" size={16} />
              <span className="text-sm font-medium">
                {taskStats.dueToday} due today
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;