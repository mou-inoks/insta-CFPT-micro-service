import { Request, Response, RequestHandler } from "express";

export const uploadImage: RequestHandler = (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
        return;
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
};