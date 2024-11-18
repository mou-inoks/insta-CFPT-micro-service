import multer, { StorageEngine } from "multer";
import path from "path";
import { serverConfig } from "../../config/serverConfig";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, serverConfig.uploadDirectory);
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

export default upload;