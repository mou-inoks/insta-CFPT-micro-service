import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

const prisma = new PrismaClient();

export class AuthService {

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(400).json({ message: "Email ou mot de passe incorrect" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Email ou mot de passe incorrect" });
            }

            if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
                throw new Error("Les variables d'environnement JWT_SECRET et JWT_EXPIRES_IN sont manquantes.");
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, username: user.username },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    createdAt: user.createdAt,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de l'authentification" });
        }
    }

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: "Token manquant" });
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide ou expiré" });
            }

            req.user = decoded;

            next();
        });
    }

}
