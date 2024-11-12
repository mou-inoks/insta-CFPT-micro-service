'use client'
import React, { FormEvent, useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Home, Image as ImageIcon, MessageCircle, PlusSquare, Search, Send } from 'lucide-react';
import { fetchPosts, createPost, likePost, Post } from '@/app/service/postService';

export default function Component() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      const initialLikes: { [key: string]: number } = {};
      fetchedPosts.forEach((post) => {
        initialLikes[post.id] = post.likes;
      });
      setLikes(initialLikes);
    };
    loadPosts();
  }, []);

  const handleLike = async (postId: string) => {
    const updatedPost = await likePost(postId);
    setPosts((prev) => prev.map((post) =>
      post.id === postId ? updatedPost : post
    ));
    setLikes((prev) => ({
      ...prev,
      [postId]: updatedPost.likes,
    }));
  };

  const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const caption = formData.get('caption') as string;

    const newPost = await createPost('currentuser', '/placeholder.svg?height=500&width=500', caption);
    setPosts((prev) => [newPost, ...prev]);
    setLikes((prev) => ({ ...prev, [newPost.id]: 0 }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-screen-xl">
          <div className="text-2xl font-bold">Instagram</div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PlusSquare className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNewPost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea id="caption" name="caption" placeholder="Write a caption..." />
                  </div>
                  <Button type="submit">Post</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow space-y-6 md:w-2/3">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt={`@${post.username}`} />
                    <AvatarFallback>{post.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">{post.username}</div>
                </CardHeader>
                <CardContent className="p-0">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="w-full h-auto"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2 w-full">
                    <Button variant="ghost" size="icon" onClick={() => handleLike(post.id)}>
                      <Heart className={`h-5 w-5 ${post.likes % 2 === 1 ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="font-semibold">{post.likes} likes</div>
                  <div>
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </div>
                  <div className="text-sm text-gray-500">View all comments</div>
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Add a comment..." className="flex-grow" />
                    <Button variant="ghost" size="sm">Post</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <aside className="md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Suggestions For You</h2>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={`/placeholder-user.jpg?${i}`} alt={`@user${i + 1}`} />
                          <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">user{i + 1}</div>
                          <div className="text-sm text-gray-500">Suggested for you</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Follow</Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="text-sm text-gray-500">
              © 2023 Instagram Clone • Not a real app
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
