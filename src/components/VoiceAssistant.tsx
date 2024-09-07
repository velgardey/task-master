import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { saveTask } from '@/lib/tasks';

interface VoiceAssistantProps {
  onTaskAdded: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onTaskAdded }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onspeechend = () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    processVoiceCommand(transcript);
  };

  const processVoiceCommand = (command: string) => {
    const lowercaseCommand = command.toLowerCase();
    const dateTimeRegex = /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(today|tomorrow|on\s+\w+day)?/i;
    const match = lowercaseCommand.match(dateTimeRegex);

    if (match) {
      const timeStr = match[1];
      const dayStr = match[2] || 'today';

      let dueDate = new Date();
      if (dayStr.includes('tomorrow')) {
        dueDate.setDate(dueDate.getDate() + 1);
      } else if (dayStr.includes('on')) {
        // Handle specific days of the week
        const dayOfWeek = dayStr.split(' ')[1];
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const targetDay = daysOfWeek.indexOf(dayOfWeek.toLowerCase());
        const currentDay = dueDate.getDay();
        const daysUntilTarget = (targetDay - currentDay + 7) % 7;
        dueDate.setDate(dueDate.getDate() + daysUntilTarget);
      }

      const [hours, minutes] = timeStr.split(':').map(Number);
      dueDate.setHours(hours, minutes || 0, 0, 0);

      const newTask = {
        id: uuidv4(),
        title: lowercaseCommand.replace(dateTimeRegex, '').trim(),
        description: '',
        dueDate,
        completed: false,
        notes: '',
      };

      saveTask(newTask);
      onTaskAdded();
      setTranscript('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={toggleListening} variant="outline" size="icon">
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      {isListening && <p className="text-sm text-muted-foreground">Listening...</p>}
      {transcript && <p className="text-sm">{transcript}</p>}
    </div>
  );
};

export default VoiceAssistant;