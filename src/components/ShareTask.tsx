import React from 'react';
import { Task } from '@/types';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';

interface ShareTaskProps {
  task: Task;
  children: React.ReactNode;
}

const ShareTask: React.FC<ShareTaskProps> = ({ task, children }) => {
  const handleShare = async () => {
    const taskText = `Task: ${task.title}\nDescription: ${task.description}\nDue Date: ${task.dueDate}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shared Task',
          text: taskText,
        });
      } catch (error) {
        console.error('Error sharing task:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported on this browser. You can copy the task details:\n\n' + taskText);
    }
  };

  return (
    <div onClick={handleShare}>
      {children}
    </div>
  );
};

export default ShareTask;