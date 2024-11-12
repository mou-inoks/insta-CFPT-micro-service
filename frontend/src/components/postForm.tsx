"use client"
import { FormEvent } from 'react';
import { createPost } from '@/app/service/postService';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const PostForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {  // Spécifier que l'événement provient d'un formulaire
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const caption = formData.get('caption') as string;
    const newPost = await createPost('currentuser', '/placeholder.svg?height=500&width=500', caption);
    console.log("New Post Created:", newPost);
    // Ici, tu peux ajouter un callback pour mettre à jour l'état de l'application si nécessaire
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="caption" className="font-semibold">Caption</label>
        <Textarea id="caption" name="caption" placeholder="Write a caption..." />
      </div>
      <Button type="submit">Post</Button>
    </form>
  );
};

export default PostForm;
