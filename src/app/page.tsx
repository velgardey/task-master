'use client'

import React, { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import DayView from '@/components/DayView';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { getTasks } from '@/lib/tasks';
import { Task } from '@/types';

export default function Home() {
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
      <h1 className="text-3xl font-bold mb-8">Task Master</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Calendar</h2>
          <Calendar tasks={tasks} onSelectDate={handleSelectDate} />
          {selectedDate && (
            <DayView tasks={tasks} date={selectedDate} onUpdate={handleUpdate} />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <TaskForm onTaskAdded={handleUpdate} />
          <h2 className="text-2xl font-bold mt-8 mb-4">All Tasks</h2>
          <TaskList tasks={tasks} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}