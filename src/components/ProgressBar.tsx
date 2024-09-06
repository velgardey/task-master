import React from 'react';
import { Task } from '@/types';

interface ProgressBarProps {
    tasks: Task[];
    selectedDate: Date;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ tasks, selectedDate }) => {
    const tasksForSelectedDate = tasks.filter(task => 
      new Date(task.dueDate).toDateString() === selectedDate.toDateString()
    );
    const completedTasks = tasksForSelectedDate.filter(task => task.completed).length;
    const totalTasks = tasksForSelectedDate.length;
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <div className="w-full mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              {selectedDate.toDateString()} - Tasks Completed: {completedTasks}/{totalTasks}
            </span>
            <span className="text-sm font-medium text-foreground">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    }
export default ProgressBar;