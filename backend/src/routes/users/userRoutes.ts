import { Router, Request, Response } from 'express';
import { UserService } from './userServices';

const router = Router();
const userService = new UserService();

router.post("/", (req: Request, res: Response) => {
    userService.create(req, res);
});

export default router;
