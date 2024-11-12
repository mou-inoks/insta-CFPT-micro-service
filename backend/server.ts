import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';  // Import Prisma Client

const app = express();
const port = 3001;

const prisma = new PrismaClient();  // Instantiate Prisma Client

const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// POST endpoint to create a new post
app.post('/api/posts', async (req: Request, res: Response) => {
  const { username, image, caption } = req.body;
  
  try {
    const newPost = await prisma.post.create({
      data: {
        username,
        image,
        caption,
        likes: 0,  // Default value
      },
    });
    res.status(201).json(newPost);  // Respond with the created post
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// GET endpoint to fetch all posts
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();  // Fetch all posts from the database
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// PUT endpoint to like a post
app.put('/api/posts/:id/like', async (req: Request, res: Response) => {
  const postId = req.params.id;

  try {
    const post = await prisma.post.update({
      where: { id: postId },  // Find the post by its ID
      data: { likes: { increment: 1 } },  // Increment the like count by 1
    });

    res.json(post);  // Return the updated post
  } catch (error) {
    res.status(404).json({ message: 'Post not found', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});