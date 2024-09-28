import { Task } from '@/types';

export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

export const saveTask = (task: Task): void => {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export const updateTask = ( updatedTask: Task) : void => {
    const tasks = getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if ( index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};

export const setTaskReminder = (task: Task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const now = new Date();
      const taskDate = new Date(task.dueDate);
      const timeDiff = taskDate.getTime() - now.getTime();
  
      if (timeDiff > 0) {
        setTimeout(() => {
          new Notification('Task Reminder', {
            body: `Your task "${task.title}" is due soon!`,
          });
        }, timeDiff);
      }
    }
  };
  

export const deleteTask = ( taskId: string ) : void => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


