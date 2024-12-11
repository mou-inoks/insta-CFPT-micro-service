import { Request, Response } from 'express';
import { sendExportRequest } from '../routes/rabbitMq/rabbitmqService';

export const exportData = async (req: Request, res: Response): Promise<Response> => {
    const { userId, userEmail } = req.body;

    try {
        await sendExportRequest(userId, userEmail);
        return res.status(200).json({ message: 'Export request sent' });
    } catch (err) {
        console.error('Failed to send export request', err);
        return res.status(500).json({ message: 'Failed to send export request' });
    };
};