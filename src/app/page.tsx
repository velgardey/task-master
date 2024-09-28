'use client'

import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import DayView from "@/components/DayView";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { getTasks } from "@/lib/tasks";
import { Task } from "@/types";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ProgressBar";
import { motion } from "framer-motion";
import TaskAnalytics from "@/components/TaskAnalytics";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleUpdate = () => {
    setTasks(getTasks());
  };

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleReorder = (reorderedTasks: Task[]) => {
    // Implement the logic to save the reordered tasks
    // For now, we'll just update the state
    setTasks(reorderedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
      >
        Task Master
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6 mb-8"
      >
        <ProgressBar tasks={tasks} selectedDate={selectedDate || new Date()} />
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-8"
        >
          <Calendar
            tasks={tasks}
            onSelectDate={handleSelectDate}
            selected={selectedDate}
          />
          {selectedDate && (
            <div className="bg-secondary/30 dark:bg-card/20 rounded-xl shadow-md dark:shadow-primary/5 p-6">
              <DayView
                tasks={tasks}
                date={selectedDate}
                onUpdate={handleUpdate}
              />
            </div>
          )}
          <TaskAnalytics tasks={tasks} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          <TaskForm onTaskAdded={handleUpdate} />
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
              tasks={tasks.filter(
                (task) =>
                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  task.description
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )}
              onUpdate={handleUpdate}
              onReorder={handleReorder}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}