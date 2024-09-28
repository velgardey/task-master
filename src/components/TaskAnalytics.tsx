import React from 'react';
import { Task } from '@/types';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TaskAnalyticsProps {
  tasks: Task[];
}

const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ tasks }) => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = endOfWeek(today);

  const daysOfWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  });

  const completedTasksPerDay = daysOfWeek.map((day) => {
    return tasks.filter(
      (task) =>
        task.completed &&
        new Date(task.dueDate).toDateString() === day.toDateString()
    ).length;
  });

  const data = {
    labels: daysOfWeek.map((day) => format(day, 'EEE')),
    datasets: [
      {
        label: 'Completed Tasks',
        data: completedTasksPerDay,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Completed Tasks This Week',
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TaskAnalytics;