import React from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Task } from "@/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CalendarProps {
  tasks: Task[];
  onSelectDate: (date: Date | undefined) => void;
  selected?: Date | undefined;
}

const modifiersStyles = {
  hasTask: {
    backgroundColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    fontWeight: "bold",
  },
  selected: {
    backgroundColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    fontWeight: "bold",
  },
};

const calendarClassNames = {
  day_selected:
    "bg-primary text-black hover:bg-primary hover:text-black focus:bg-primary focus:text-black font-bold relative z-10",
  day_today: "bg-accent text-accent-foreground font-bold",
  day: "w-10 h-10 p-0 font-normal text-black dark:text-foreground aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors relative",
  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
  caption_label: "text-black dark:text-foreground font-medium",
  nav_button: "text-black dark:text-foreground",
};
const Calendar: React.FC<CalendarProps> = ({
  tasks,
  onSelectDate,
  selected,
}) => {
  const taskDates: Date[] = tasks.map((task) => new Date(task.dueDate));

  return (
    <div className="p-4 bg-white dark:bg-card rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border border-secondary w-full max-w-[350px] mx-auto">
      <CalendarUI
  mode="single"
  selected={selected}
  onSelect={onSelectDate}
  className="w-full"
  modifiers={{ hasTask: taskDates }}
  modifiersStyles={modifiersStyles}
  classNames={{
    ...calendarClassNames,
    months: "flex flex-col space-y-4",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center mb-2",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: cn(
      buttonVariants({ variant: "outline" }),
      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
    ),
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse",
    head_row: "flex w-full",
    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1",
    row: "flex w-full mt-2",
    cell: cn(
      "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1",
      "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
    ),
    day: cn(
      "h-9 w-9 p-0 font-normal mx-auto",
      "hover:bg-accent hover:text-accent-foreground",
      "aria-selected:opacity-100"
    ),
    day_range_end: "day-range-end",
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "text-muted-foreground opacity-50",
    day_disabled: "text-muted-foreground opacity-50",
    day_hidden: "invisible",
  }}
/>
    </div>
  );
}
export default Calendar;
