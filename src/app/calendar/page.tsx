'use client';

import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import DayView from '@/components/DayView';
import { getTasks } from '@/lib/tasks';
import { Task } from '@/types';

const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleUpdate = () => {
    setTasks(getTasks());
  };

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Calendar View</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Calendar tasks={tasks} onSelectDate={handleSelectDate} />
        {selectedDate && (
          <DayView tasks={tasks} date={selectedDate} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;