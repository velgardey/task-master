'use client'
import { Task } from "@/types";
import { updateTask, deleteTask } from "@/lib/tasks";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  ClockIcon, 
  TrashIcon, 
  PencilIcon, 
  XIcon, 
  ShareIcon,
  TagIcon,
  FolderIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  AlertOctagonIcon
} from "lucide-react";
import { format } from "date-fns";
import ShareTask from './ShareTask';
import { Badge } from "./ui/Badge";

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  showDate?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, showDate = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low':
        return <AlertTriangleIcon className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <AlertCircleIcon className="w-4 h-4 text-yellow-500" />;
      case 'high':
        return <AlertOctagonIcon className="w-4 h-4 text-red-500" />;
    }
  };

  const handleComplete = () => {
    const updatedTaskData = { ...task, completed: !task.completed };
    updateTask(updatedTaskData);
    onUpdate();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onUpdate();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(editedTask);
    setIsEditing(false);
    onUpdate();
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm mb-4 text-gray-800 dark:text-gray-200 hover:shadow-md transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start space-x-2 sm:space-x-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
          className="mt-1 w-4 h-4 sm:w-5 sm:h-5"
        />
        <div className="flex-grow space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
            <div className="flex-grow pr-2 sm:pr-4">
              <div className="flex items-center gap-2 mb-1">
                {getPriorityIcon(task.priority)}
                {isEditing ? (
                  <Input
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="font-semibold text-base sm:text-lg"
                  />
                ) : (
                  <h3 className={`font-semibold text-base sm:text-lg ${
                    task.completed 
                      ? "line-through text-gray-500 dark:text-gray-400" 
                      : ""
                  }`}>
                    {task.title}
                  </h3>
                )}
              </div>
              {!showDate && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{task.notes}</p>
              )}
            </div>
            <div className="flex sm:flex-col items-center sm:items-stretch gap-2 sm:space-y-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm" variant="outline" className="h-8 w-8 p-0">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline" className="h-8 w-8 p-0">
                    <XIcon className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleEdit} size="sm" variant="outline" className="h-8 w-8 p-0">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                  <ShareTask task={task}>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShareIcon className="w-4 h-4" />
                    </Button>
                  </ShareTask>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {task.category && (
              <div className="flex items-center text-xs sm:text-sm">
                <FolderIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">{task.category}</span>
              </div>
            )}
            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1 sm:gap-2">
                <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {task.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-[10px] sm:text-xs px-1.5 py-0 sm:px-2.5 sm:py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {showDate && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {format(new Date(task.dueDate), "PPP")}
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-2 sm:ml-4 mr-1 sm:mr-2" />
                {format(new Date(task.dueDate), "p")}
              </div>
            )}
            {!showDate && (
              <div className="flex items-center space-x-1 sm:space-x-2 text-primary">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-semibold">
                  {format(new Date(task.dueDate), "HH:mm")}
                </span>
              </div>
            )}
          </div>

          {isEditing && (
            <Textarea
              value={editedTask.notes}
              onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              placeholder="Add notes..."
              className="mt-2 w-full h-16 sm:h-20 text-xs sm:text-sm"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;