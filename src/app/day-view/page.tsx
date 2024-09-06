'use client';

import React, { useState, useEffect } from 'react';
import DayView from '@/components/DayView';
import { getTasks } from '@/lib/tasks';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';

const DayViewPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleUpdate = () => {
    setTasks(getTasks());
  };

  const handlePreviousDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Day View</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePreviousDay}>Previous Day</Button>
        <Button onClick={handleNextDay}>Next Day</Button>
      </div>
      <DayView tasks={tasks} date={currentDate} onUpdate={handleUpdate} />
    </div>
  );
};

export default DayViewPage;