import mongoose, { Schema, Model } from "mongoose";
import { ITask } from "../interfaces/task.interface";

const taskSchema: Schema<ITask> = new Schema(
    {
        taskType: {
            type: String,
            required: true,
        },
        assignee: {
            type: String,
            required: true,
        },
        priorityLevel: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
