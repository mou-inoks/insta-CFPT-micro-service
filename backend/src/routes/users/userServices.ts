import bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserService {
    async create(req: Request<{}, {}, User>, res: Response) {
        const { email, password, username } = req.body;

        try {
            const existingEmailUser = await prisma.user.findUnique({
                where: { email },
            });
            if (existingEmailUser) {
                return res.status(400).json({ message: 'Email déjà utilisé' });
            }

            const existingUsernameUser = await prisma.user.findUnique({
                where: { username },
            });
            if (existingUsernameUser) {
                return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                },
            });

            // Génération du token
            const token = this.generateToken(user.id, user.email);

            return res.status(201).json({
                id: user.id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
                token,  // Le token est renvoyé dans la réponse
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private generateToken(userId: number, email: string) {
        const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Utilisez une clé secrète définie dans vos variables d'environnement
        const payload = { userId, email };
        const options = { expiresIn: '1h' }; // Le token expire après 1 heure

        return jwt.sign(payload, secretKey, options);
    }

    private handleError(error: any, res: Response) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}
