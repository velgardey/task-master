import { Task } from "@/types";
import { updateTask, deleteTask } from "@/lib/tasks";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React from "react";
import { Button } from "./ui/button";

interface TaskItemProps {
    task: Task;
    onUpdate: () => void;
}


const TaskItem: React.FC<TaskItemProps> = ({task, onUpdate}) => {
    const handleComplete = () => {
        const updatedTaskData = { ...task, completed: !task.completed };
        updateTask(updatedTaskData);
        onUpdate();
    };

    const handleDelete = () => {
        deleteTask(task.id);
        onUpdate();
    };

    const handleNoteChange = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedTaskData = { ...task, notes: e.target.value};
        updateTask(updatedTaskData);
        onUpdate();
    };

    return (
        <div className="bg-card p-4 rounded-lg shadow-md mb-4 text-card-foreground">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 w-full">
                    <Checkbox
                        checked={task.completed}
                        onCheckedChange={handleComplete}
                    />
                    <Input 
                        value={task.title}
                        onChange={(e) => {
                            const updatedTaskData = { ...task, title: e.target.value};
                            updateTask(updatedTaskData);
                            onUpdate();
                        }}
                        className="font-semibold bg-background text-foreground"
                    />
                    <Button 
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <Textarea 
                value={task.notes}
                onChange={handleNoteChange}
                placeholder="Add notes..."
                className="mt-2 w-full bg-background text-foreground"
            />
        </div>
    );
};

export default TaskItem;