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

interface TaskFormProps {
    onTaskAdded: () => void;
    initialDate?: Date;
  }

  const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, initialDate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
    const [time, setTime] = useState({ hours: "12", minutes: "00" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dueDate = new Date(date!);
        dueDate.setHours(parseInt(time.hours), parseInt(time.minutes));

        const newTask = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            completed: false,
            notes: "",
        };
        saveTask(newTask);
        setTitle("");
        setDescription("");
        setDate(new Date());
        setTime({ hours: "12", minutes: "00" });
        onTaskAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
            />
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
            />
            <div className="flex space-x-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
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
                        onValueChange={(value) =>
                            setTime((prev) => ({ ...prev, hours: value }))
                        }
                    >
                        <SelectTrigger className="w-[80px]">
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
                        onValueChange={(value) =>
                            setTime((prev) => ({ ...prev, minutes: value }))
                        }
                    >
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Minutes" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                                <SelectItem
                                    key={minute}
                                    value={minute.toString().padStart(2, "0")}
                                >
                                    {minute.toString().padStart(2, "0")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button type="submit">Add Task</Button>
        </form>
    );
};

export default TaskForm;
