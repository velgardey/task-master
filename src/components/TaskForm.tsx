import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveTask } from "@/lib/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VoiceAssistant from "./VoiceAssistant";

interface TaskFormProps {
  onTaskAdded: () => void;
  initialDate?: Date;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, initialDate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
  const [time, setTime] = useState({ hours: "12", minutes: "00" });
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTask();
  };

  const submitTask = () => {
    const dueDate = new Date(date!);
    dueDate.setHours(parseInt(time.hours), parseInt(time.minutes));

    const newTask = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      completed: false,
      notes: "",
      category,
      tags,
      priority,
    };
    saveTask(newTask);
    resetForm();
    onTaskAdded();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setTime({ hours: "12", minutes: "00" });
    setCategory("");
    setTags([]);
    setPriority('medium');
  };

  const handleVoiceTranscript = (transcript: string) => {
    const lowercaseTranscript = transcript.toLowerCase();
    
    if (lowercaseTranscript.includes('title')) {
      const titleMatch = lowercaseTranscript.match(/title\s+(.*)/);
      if (titleMatch) {
        setTitle(titleMatch[1]);
      }
    }
    
    if (lowercaseTranscript.includes('description')) {
      const descriptionMatch = lowercaseTranscript.match(/description\s+(.*)/);
      if (descriptionMatch) {
        setDescription(descriptionMatch[1]);
      }
    }
    
    if (lowercaseTranscript.includes('date')) {
      const dateMatch = lowercaseTranscript.match(/date\s+(.*)/);
      if (dateMatch) {
        const parsedDate = new Date(dateMatch[1]);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate);
        }
      }
    }
    
    if (lowercaseTranscript.includes('time')) {
      const timeMatch = lowercaseTranscript.match(/time\s+(\d{1,2}):?(\d{2})?/);
      if (timeMatch) {
        const hours = timeMatch[1].padStart(2, '0');
        const minutes = (timeMatch[2] || '00').padStart(2, '0');
        setTime({ hours, minutes });
      }
    }
    
    if (lowercaseTranscript.includes('category')) {
      const categoryMatch = lowercaseTranscript.match(/category\s+(.*)/);
      if (categoryMatch) {
        setCategory(categoryMatch[1]);
      }
    }
    
    if (lowercaseTranscript.includes('tags')) {
      const tagsMatch = lowercaseTranscript.match(/tags\s+(.*)/);
      if (tagsMatch) {
        setTags(tagsMatch[1].split(',').map(tag => tag.trim()));
      }
    }
    
    if (lowercaseTranscript.includes('priority')) {
      if (lowercaseTranscript.includes('low')) {
        setPriority('low');
      } else if (lowercaseTranscript.includes('medium')) {
        setPriority('medium');
      } else if (lowercaseTranscript.includes('high')) {
        setPriority('high');
      }
    }
    
    if (lowercaseTranscript.includes('submit') || lowercaseTranscript.includes('add task')) {
      submitTask();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="text-xl font-semibold text-foreground text-black dark:text-foreground"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="h-32 text-base resize-none text-black dark:text-foreground"
      />
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto text-black dark:text-foreground">
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex space-x-2">
          <Select
            value={time.hours}
            onValueChange={(value) => setTime((prev) => ({ ...prev, hours: value }))}
          >
            <SelectTrigger className="w-[100px] text-black dark:text-foreground">
              <SelectValue placeholder="Hours" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
                  {hour.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={time.minutes}
            onValueChange={(value) => setTime((prev) => ({ ...prev, minutes: value }))}
          >
            <SelectTrigger className="w-[100px] text-black dark:text-foreground">
              <SelectValue placeholder="Minutes" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <SelectItem key={minute} value={minute.toString().padStart(2, "0")}>
                  {minute.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="text-base text-black dark:text-foreground"
      />
      
      <Input
        type="text"
        value={tags.join(', ')}
        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        placeholder="Tags (comma-separated)"
        className="text-base text-black dark:text-foreground"
      />
      
      <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
        <SelectTrigger className="w-full text-black dark:text-foreground">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center justify-between">
        <Button type="submit" className="w-auto">
          Add Task
        </Button>
        <VoiceAssistant onTranscript={handleVoiceTranscript} />
      </div>
    </form>
  );
};

export default TaskForm;