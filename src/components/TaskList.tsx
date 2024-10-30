'use client'
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
  onReorder: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onReorder }) => {
  const [filter, setFilter] = React.useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <h2 className="text-2xl sm:text-3xl font-bold">Tasks</h2>
      <div className="flex w-full sm:w-auto space-x-2 sm:space-x-3">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className="flex-1 sm:flex-none text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className="flex-1 sm:flex-none text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className="flex-1 sm:flex-none text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3"
        >
          Completed
        </Button>
      </div>
    </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
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
                  filteredTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem task={task} onUpdate={onUpdate} showDate={true} />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;