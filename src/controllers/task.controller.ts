import { Request, Response } from 'express';
import Task from '../models/task.model';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { taskType, assignee, priorityLevel, description, dueDate, location } = req.body;

    try {
        const newTask = new Task({
            taskType,
            assignee,
            priorityLevel,
            description,
            dueDate,
            location,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};
