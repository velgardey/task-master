import { Task } from "@/types";
import { updateTask, deleteTask } from "@/lib/tasks";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, TrashIcon, PencilIcon, XIcon } from "lucide-react";
import { format } from "date-fns";


interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  showDate?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, showDate = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

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
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4 text-gray-800 dark:text-gray-200 hover:shadow-md transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start space-x-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
          className="mt-1 w-5 h-5"
        />
        <div className="flex-grow space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex-grow pr-4">
              {isEditing ? (
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="font-semibold text-lg mb-1"
                />
              ) : (
                <h3 className={`font-semibold text-lg mb-1 ${
                  task.completed 
                    ? "line-through text-gray-500 dark:text-gray-400" 
                    : ""
                }`}>
                  {task.title}
                </h3>
              )}
              {!showDate && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.notes}</p>
              )}
            </div>
            {!showDate && (
              <div className="flex items-center space-x-2 text-primary">
                <ClockIcon className="w-4 h-4" />
                <span className="text-lg font-semibold">
                  {format(new Date(task.dueDate), "HH:mm")}
                </span>
              </div>
            )}
          </div>
          {showDate && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {format(new Date(task.dueDate), "PPP")}
              <ClockIcon className="w-4 h-4 ml-4 mr-2" />
              {format(new Date(task.dueDate), "p")}
            </div>
          )}
          {isEditing && (
            <Textarea
              value={editedTask.notes}
              onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              placeholder="Add notes..."
              className="mt-2 w-full h-20 text-sm"
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm" variant="outline">
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                <XIcon className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} size="sm" variant="outline">
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default TaskItem;