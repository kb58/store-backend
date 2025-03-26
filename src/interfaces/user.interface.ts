import { Document } from 'mongoose';

export interface IUser extends Document {
    displayName: string;
    username: string;
    email: string;
    img?: string;
    hashedPassword: string;
    role:string;
}
