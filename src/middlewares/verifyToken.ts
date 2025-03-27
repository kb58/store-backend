// Code Generated by Sidekick is for learning and experimentation purposes only.
import { AuthenticatedRequest } from '../interfaces/authenticateRequest.interface';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
            if (err) {
                res.status(403).json({ message: "Token is invalid" });
                return;
            }

            req.userId = (payload as { userId: string }).userId;
            req.role=(payload as {userRole: string}).userRole;
            req.userName=(payload as {userName:string}).userName;
            next();
        });
    } catch (error) {
        console.log("Error in verifying the token", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
