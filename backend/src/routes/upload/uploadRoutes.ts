import { Router } from "express";
import upload from "./uploadMiddleware";
import { uploadImage } from "./uploadController";

const router = Router();

router.post("/", upload.single("image"), uploadImage);

export default router;