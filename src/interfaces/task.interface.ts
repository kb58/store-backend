import { Document } from 'mongoose';

export interface ITask extends Document {
    taskType: string;
    assignee: string;
    priorityLevel: string;
    description: string;
    dueDate: Date;
    location: string;
}
