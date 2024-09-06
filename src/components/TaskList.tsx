import React from "react";
import { Task } from "@/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TaskList;