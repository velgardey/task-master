import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Task } from '@/types';

interface CalendarProps {
  tasks: Task[];
  onSelectDate: (date: Date | undefined) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onSelectDate }) => {
  const taskDates = tasks.map((task) => new Date(task.dueDate));

  return (
    <CalendarUI
      mode="single"
      selected={undefined}
      onSelect={onSelectDate}
      className="rounded-md border"
      modifiers={{
        hasTask: taskDates,
      }}
      modifiersStyles={{
        hasTask: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default Calendar;