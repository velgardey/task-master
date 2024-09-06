import React from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface CalendarProps {
  tasks: Task[];
  onSelectDate: (date: Date | undefined) => void;
  selected?: Date | undefined;
}

const modifiersStyles = {
  hasTask: {
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    fontWeight: 'bold',
  },
};

const calendarClassNames = {
  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day: "w-10 h-10 p-0 font-normal aria-selected:opacity-100 hover:bg-secondary hover:text-secondary-foreground transition-colors",
  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
};

const Calendar: React.FC<CalendarProps> = ({ tasks, onSelectDate, selected }) => {
  const taskDates: Date[] = tasks.map((task) => new Date(task.dueDate));

  return (
    <div className="p-4 bg-card rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
      <CalendarUI
        mode="single"
        selected={selected}
        onSelect={onSelectDate}
        className="rounded-md border-0"
        modifiers={{ hasTask: taskDates }}
        modifiersStyles={modifiersStyles}
        classNames={{
          ...calendarClassNames,
          day: cn(calendarClassNames.day, "hover:bg-primary/20 transition-colors"),
          day_selected: cn(calendarClassNames.day_selected, "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"),
          day_today: cn(calendarClassNames.day_today, "font-bold"),
        }}
      />
    </div>
  );
};

export default Calendar;