import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";

// Type to refer to any Prisma model dynamically
type PrismaModel = keyof typeof prisma;

export class BaseController {

    private async findItems<T>(
        modelName: PrismaModel,
        filters: any = {},
        include: any = {}
    ): Promise<any[]> {
        const model = prisma[modelName] as any;
        return model.findMany({
            where: filters,
            include: include,
        });
    }

    async get(req: Request, res: Response, modelName: PrismaModel, filters: any, include: any) {
        try {
            const items = await this.findItems(modelName, filters, include);
            if (items.length === 0) {
                return res.status(404).json({ message: `${String(modelName)} not found` });
            }
            return res.status(200).json(items);
        } catch (error: any) {
            return this.handleError(error, res);
        }
    }

    async getById(req: Request, res: Response, modelName: PrismaModel) {
        try {
            const model = prisma[modelName] as any;
            const item = await model.findUnique({
                where: { id: Number(req.params.id) },
            });

            if (!item) {
                return res.status(404).json({ message: `${String(modelName)} not found` });
            }
            return res.status(200).json(item);
        } catch (error: any) {
            return this.handleError(error, res);
        }
    }

    async create(req: Request, res: Response, modelName: PrismaModel) {
        try {
            const model = prisma[modelName] as any;
            const newItem = await model.create({
                data: req.body,
            });
            return res.status(201).json(newItem);
        } catch (error: any) {
            return this.handleError(error, res);
        }
    }

    async update(req: Request, res: Response, modelName: PrismaModel) {
        try {
            const model = prisma[modelName] as any;
            const updatedItem = await model.update({
                where: { id: Number(req.params.id) },
                data: req.body,
            });

            if (!updatedItem) {
                return res.status(404).json({ message: `${String(modelName)} not found` });
            }
            return res.status(200).json(updatedItem);
        } catch (error: any) {
            return this.handleError(error, res);
        }
    }


    async deleteById(req: Request, res: Response, modelName: PrismaModel) {
        try {
            const model = prisma[modelName] as any;
            const deletedItem = await model.delete({
                where: { id: Number(req.params.id) },
            });

            return res.status(200).json({ message: `${String(modelName)} deleted successfully` });
        } catch (error: any) {
            return this.handleError(error, res);
        }
    }

    private handleError(error: any, res: Response) {
        if (error instanceof Error) {
            if (error.message.includes('Invalid `model.create()` invocation')) {
                const missingFieldMatch = error.message.match(/Argument `(.*?)` is missing/);
                if (missingFieldMatch && missingFieldMatch[1]) {
                    return res.status(400).json({
                        message: `Missing required field: ${missingFieldMatch[1]}`,
                    });
                }
            }
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
}