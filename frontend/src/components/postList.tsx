"use client"
import { useEffect, useState } from 'react';
import { fetchPosts, likePost, Post } from '@/service/postService';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'; // Ajout de AvatarImage
import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  const handleLike = async (postId: string) => {
    const updatedPost = await likePost(postId);
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="card">
          {/* Correction ici : Utilisation de AvatarImage */}
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt={post.username} />
            <AvatarFallback>{post.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3>{post.username}</h3>
          <Image src={post.image} alt={post.caption} className="w-full" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => handleLike(post.id)}>
              <Heart className={`h-5 w-5 ${post.likes % 2 === 1 ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <span>{post.likes} likes</span>
          </div>
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
