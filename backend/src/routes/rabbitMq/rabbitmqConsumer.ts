import amqp from 'amqplib';
import fs from 'fs-extra';
import path from 'path';
import nodemailer from 'nodemailer';
import { prisma } from '../../utils/prismaClient'

const RABBITMQ_URL = 'amqp://rabbitmq:5672';
const EXPORT_DIR = path.resolve(__dirname, '../../../../../exports');

const connectToRabbitMQ = async (url: string, retries: number = 5) => {
    let connection;
    while (retries) {
        try {
            connection = await amqp.connect(url);
            console.log('Connexion RabbitMQ réussie');
            return connection;
        } catch (error) {
            console.error('Erreur de connexion à RabbitMQ:', error);
            retries -= 1;
            if (retries === 0) {
                throw new Error('Impossible de se connecter à RabbitMQ après plusieurs tentatives');
            }
            console.log('Nouvelle tentative dans 2 secondes...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

export async function startConsumer() {
    const conn = await connectToRabbitMQ(RABBITMQ_URL);
    const channel = await conn?.createChannel();
    const queue = 'export_requests';

    await channel?.assertQueue(queue, { durable: true });

    console.log('Consommateur démarré et en attente de messages...');

    channel?.consume(queue, async (msg : any) => {
        if (msg) {
            const { userId, email } = JSON.parse(msg.content.toString());

            console.log(`Traitement de la tâche pour l'utilisateur ${userId}`);

            try {
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: { posts: true },
                });

                if (!user) {
                    throw new Error(`Utilisateur ${userId} introuvable`);
                }

                const filePath = path.join(EXPORT_DIR, `user_${userId}.json`);
                console.log('EXPORT_DIR:', EXPORT_DIR);
                console.log(`Écriture du fichier à l'emplacement : ${filePath}`);

                await fs.ensureDir(EXPORT_DIR);
                await fs.writeJson(filePath, user);

                const downloadUrl = `http://localhost:9000/exports/user_${userId}.json`;

                await sendExportEmail(email, downloadUrl);

                console.log(`Export terminé pour l'utilisateur ${userId}`);
            } catch (error) {
                console.error('Erreur lors du traitement de la tâche :', error);
            }

            channel.ack(msg);
        }
    });
}

async function sendExportEmail(email: string, downloadUrl: string) {
    const transporter = nodemailer.createTransport({
        host: 'mailhog',
        port: 1025,
        secure: false,
    });

    await transporter.sendMail({
        from: '"Support" <support@example.com>',
        to: email,
        subject: 'Votre export est prêt',
        text: `Bonjour,\n\nVotre export est prêt. Vous pouvez le télécharger ici : ${downloadUrl}`,
    });

    console.log(`Email envoyé à ${email} avec le lien ${downloadUrl}`);
}

startConsumer().catch(console.error);
