import bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';


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

            return res.status(201).json({
                id: user.id,
                email: user.email,
                username: user.username,
                createdAt: user.createdAt,
            });
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: any, res: Response) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}
