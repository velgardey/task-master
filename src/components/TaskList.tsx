import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate }) => {
  const [filter, setFilter] = React.useState<'all' | 'active' | 'completed'>('all');
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const filteredTasks = sortedTasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Tasks</h2>
        <div className="space-x-3">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="text-lg px-6 py-3"
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            className="text-lg px-6 py-3"
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
            className="text-lg px-6 py-3"
          >
            Completed
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {filteredTasks.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-muted-foreground text-xl"
          >
            No tasks available.
          </motion.p>
        ) : (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TaskItem task={task} onUpdate={onUpdate} showDate={true} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;