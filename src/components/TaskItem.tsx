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
     className="bg-secondary/30 dark:bg-card p-6 rounded-lg shadow-md mb-6 text-card-foreground hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="flex items-start space-x-6">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleComplete}
          className="mt-1 w-6 h-6"
        />
        <div className="flex-grow space-y-4">
          {isEditing ? (
            <Input
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="font-semibold text-xl mb-2"
            />
          ) : (
            <h3 className={`font-semibold text-xl mb-2 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h3>
          )}
          {showDate && (
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {format(new Date(task.dueDate), "PPP")}
              <ClockIcon className="w-4 h-4 ml-4 mr-2" />
              {format(new Date(task.dueDate), "p")}
            </div>
          )}
          {isEditing ? (
            <Textarea
              value={editedTask.notes}
              onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              placeholder="Add notes..."
              className="mt-2 w-full h-24 text-base"
            />
          ) : (
            <p className="text-base">{task.notes}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="icon" variant="outline">
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button onClick={handleCancel} size="icon" variant="outline">
                <XIcon className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} size="icon" variant="outline">
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
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