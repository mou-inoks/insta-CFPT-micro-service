import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3001;

const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/api/posts', async (req: Request, res: Response) => {
  const { authorId, imageUrl, description } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId,
        imageUrl,
        description,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error });
  }
});

app.get('/api/posts', async (_req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true, 
      },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

app.put('/api/posts/:id/like', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    res.json(post);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(404).json({ message: 'Post not found', error });
  }
  res.status(501).json({ message: 'Likes feature not implemented' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
