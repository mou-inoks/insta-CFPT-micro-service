import { Router, Request, Response } from "express";
import { PostService } from "./postService";

const router = Router();
const postService = new PostService();

router.get("/", (req: Request, res: Response) => {
    postService.get(req, res);
});

router.post("/", (req: Request, res: Response) => {
    postService.createPost(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
    postService.getPostById(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
    postService.updatePost(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
    postService.deletePost(req, res);
});

export default router;