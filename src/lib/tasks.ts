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

export const deleteTask = ( taskId: string ) : void => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


