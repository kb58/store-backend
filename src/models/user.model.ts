import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface'

const userSchema: Schema<IUser> = new Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        img: {
            type: String,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['staff', 'manager'],
            default: 'staff'
        },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
