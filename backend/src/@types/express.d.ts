import { User } from '@prisma/client'; // Import your User type from Prisma or wherever it's defined

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}