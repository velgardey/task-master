import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';

interface DayViewProps {
  tasks: Task[];
  date: Date;
  onUpdate: () => void;
}

const DayView: React.FC<DayViewProps> = ({ tasks, date, onUpdate }) => {
  const filteredTasks = tasks
    .filter((task) => new Date(task.dueDate).toDateString() === date.toDateString())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{date.toDateString()}</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-muted-foreground">No tasks for this day.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={onUpdate} showDate={false} />
        ))
      )}
    </div>
  );
};

export default DayView;