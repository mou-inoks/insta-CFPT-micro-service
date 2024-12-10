"use client"
import React, { FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Home, Image as ImageIcon, LogOut, MessageCircle, PlusSquare, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createPost, Post } from '@/service/postService';
import Image from 'next/image';

interface HeaderProps {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    setLikes: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    onLogout: () => void;
}

const Header = (props: HeaderProps) => {

    const { setPosts, setLikes, onLogout } = props;

    const handleNewPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const caption = formData.get('caption') as string;

        const newPost = await createPost('currentuser', '/placeholder.svg?height=500&width=500', caption);
        setPosts((prev) => [newPost, ...prev]);
        setLikes((prev) => ({ ...prev, [newPost.id]: 0 }));
    };

    const [newPostImage, setNewPostImage] = React.useState<string | null>(null)

    const handleRemoveImage = () => {
        setNewPostImage(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewPostImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

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
                                    <Label htmlFor="image-upload">Upload Image</Label>
                                    <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-md overflow-hidden relative">
                                        {newPostImage ? (
                                            <>
                                                <Image src={newPostImage} alt="New post preview" className="max-w-full max-h-full object-contain" />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={handleRemoveImage}
                                                >
                                                    Remove
                                                </Button>
                                            </>
                                        ) : (
                                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                                <span className="mt-2 text-sm text-gray-500">Click to upload an image</span>
                                            </label>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>
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
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>
        </header >
    )
}

export default Header;
