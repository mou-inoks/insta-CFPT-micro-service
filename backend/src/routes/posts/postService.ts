import { Request, Response } from "express";
import { BaseController } from "../../controllers/controller";

export class PostService {
    private baseController: BaseController;

    constructor() {
        this.baseController = new BaseController();
    }

    async get(req: Request, res: Response) {
        try {
            const filters = this.parseFilters(req.query.filters);
            const include = this.parseIncludes(req.query.include);

            return this.baseController.get(req, res, "post", filters, include);
        } catch (error) {
            this.handleError(error, res);
        }
    }


    async getPostById(req: Request, res: Response) {
        try {
            return this.baseController.getById(req, res, "post");
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            return this.baseController.create(req, res, "post");
        } catch (error) {
            this.handleError(error, res);
        }
    }


    async updatePost(req: Request, res: Response) {
        try {
            return this.baseController.update(req, res, "post");
        } catch (error) {
            this.handleError(error, res);
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            return this.baseController.deleteById(req, res, "post");
        } catch (error) {
            this.handleError(error, res);
        }
    }

    private handleError(error: any, res: Response) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "An unexpected error occurred" });
        }
    }

    private parseFilters(filters: any): any {
        if (!filters) return {};
        try {
            return JSON.parse(filters as string);
        } catch (error) {
            throw new Error("Invalid filters format");
        }
    }

    private parseIncludes(include: any): any {
        if (!include) return {};
        try {
            return JSON.parse(include as string);
        } catch (error) {
            throw new Error("Invalid include format");
        }
    }
}