import { Router } from "express";
import postRoutes from "./posts/postRoutes";
import userRoutes from "./users/userRoutes";
import authRoutes from "./auth/authRoutes";
import uploadRoutes from "./upload/uploadRoutes";

const mainRoutes = Router();

mainRoutes.use("/api/posts", postRoutes);
mainRoutes.use("/api/users", userRoutes);
mainRoutes.use("/api/auth", authRoutes);
mainRoutes.use("/api/upload", uploadRoutes)

export default mainRoutes;