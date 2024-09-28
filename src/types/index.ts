export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  notes: string;
  category: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}