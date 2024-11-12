import React, { FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Heart, Home, Image as ImageIcon, MessageCircle, PlusSquare, Search, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createPost, Post } from '@/app/service/postService';

interface HeaderProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    setLikes: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

const Header = (props: HeaderProps) => {
    const { setPosts, setLikes } = props;
    const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const caption = formData.get('caption') as string;
    
        const newPost = await createPost('currentuser', '/placeholder.svg?height=500&width=500', caption);
        setPosts((prev) => [newPost, ...prev]);
        setLikes((prev) => ({ ...prev, [newPost.id]: 0 }));
    };

    return (
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
    )
}

export default Header;
