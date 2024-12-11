import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://rabbitmq:5672';

export async function sendExportRequest(userId: number, email: string): Promise<void> {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    const queue = 'export_requests';

    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({ userId, email });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log(`Tâche envoyée pour l'utilisateur ${userId} à ${email}`);
    await channel.close();
    await conn.close();
}
