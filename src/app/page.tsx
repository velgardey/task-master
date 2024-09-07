"use client";

import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import DayView from "@/components/DayView";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { getTasks } from "@/lib/tasks";
import { Task } from "@/types";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Task Master
      </h1>
      <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6 mb-8">
        <ProgressBar tasks={tasks} selectedDate={selectedDate || new Date()} />
      </div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-1 space-y-8">
    <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <Calendar tasks={tasks} onSelectDate={handleSelectDate} selected={selectedDate} />
    </div>
    {selectedDate && (
      <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6">
        <DayView tasks={tasks} date={selectedDate} onUpdate={handleUpdate} />
      </div>
    )}
  </div>
  <div className="lg:col-span-2 space-y-8">
    <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <TaskForm onTaskAdded={handleUpdate} />
    </div>
    <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6">
      <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <TaskList
        tasks={tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onUpdate={handleUpdate}
      />
    </div>
  </div>
</div>
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
}
