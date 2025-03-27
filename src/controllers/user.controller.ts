import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface'
import { AuthenticatedRequest } from '@/interfaces/authenticateRequest.interface';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }) as IUser;

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

        res.status(200).json(detailsWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, displayName, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }

    try {
        const newHashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            displayName,
            email,
            hashedPassword: newHashedPassword,
            role:"staff"
        }) as IUser;

        const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

        res.status(200).json(detailsWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.errmsg});
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }

    try {
        const user = await User.findOne({ email }) as IUser;

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect Password" });
            return;
        }

        const token = jwt.sign({ userId: user._id ,userRole:user.role,userName:user.username}, process.env.JWT_SECRET as string);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({token:token});
    } catch (error) {
        res.status(500).json({ message: error.errmsg });
    }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token");

    res.status(200).json({ message: "Logout successful" });
};


export const createUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { username, password, role } = req.body;

    try {
        let userRole = 'staff';
        if (req.role === 'manager' && role === 'manager') {
            userRole = 'manager';
        }

        const newUser = new User({
            username,
            password,
            role: userRole,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}
