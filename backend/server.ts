import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',  // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'PUT'], // Méthodes autorisées
  allowedHeaders: ['Content-Type'], // Entêtes autorisés
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let posts = [
  {
    id: 'post1',
    username: 'johndoe',
    image: '/placeholder.svg?height=500&width=500',
    caption: 'Beautiful sunset at the beach! 🌅',
    likes: 234,
  },
  {
    id: 'post2',
    username: 'janedoe',
    image: '/placeholder.svg?height=500&width=500',
    caption: 'Enjoying my morning coffee ☕️',
    likes: 56,
  },
];

app.post('/api/posts', (req: Request, res: Response) => {
  const { username, image, caption } = req.body;
  const newPost = {
    id: `post${posts.length + 1}`,
    username,
    image,
    caption,
    likes: 0,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get('/api/posts', (req: Request, res: Response) => {
  res.json(posts);
});

app.put('/api/posts/:id/like', (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    post.likes += 1;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
