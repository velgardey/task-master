export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    notes: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }