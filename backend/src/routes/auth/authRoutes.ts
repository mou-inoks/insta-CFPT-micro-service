import { Router } from 'express';
import { AuthService } from './authService';

const router = Router();
const authService = new AuthService();

router.post("/login", (req, res) => {
    authService.login(req, res);
});

router.post("/verify", (req, res, next) => {
    AuthService.verifyToken(req, res, next);
}, (req, res) => {
    res.status(200).json({ message: "Token valide", user: req.user });
});

export default router;

