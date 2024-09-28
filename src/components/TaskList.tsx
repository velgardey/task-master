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