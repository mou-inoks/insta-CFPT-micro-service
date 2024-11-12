"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, HomeIcon, MessageCircle, PlusSquare, Search, Send } from 'lucide-react'

type Likes = {
  [key: string]: number;  
};

export default function Home() {

  const [likes, setLikes] = useState<Likes>({
    post1: 0,
    post2: 0,
  });

  const handleLike = (postId: number) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1  
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-screen-xl">
          <div className="text-2xl font-bold">Instagram</div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <HomeIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <PlusSquare className="h-5 w-5" />
            </Button>
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
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="font-semibold">johndoe</div>
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Post image"
                  className="w-full h-auto"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 w-full">
                  <Button variant="ghost" size="icon" onClick={() => handleLike('post1')}>
                    <Heart className={`h-5 w-5 ${likes.post1 % 2 === 1 ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="font-semibold">{likes.post1} likes</div>
                <div>
                  <span className="font-semibold">johndoe</span> Beautiful sunset at the beach! 🌅
                </div>
                <div className="text-sm text-gray-500">View all 28 comments</div>
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
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@janedoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="font-semibold">janedoe</div>
              </CardHeader>
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Post image"
                  className="w-full h-auto"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 w-full">
                  <Button variant="ghost" size="icon" onClick={() => handleLike('post2')}>
                    <Heart className={`h-5 w-5 ${likes.post2 % 2 === 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="font-semibold">{likes.post2} likes</div>
                <div>
                  <span className="font-semibold">janedoe</span> Enjoying my morning coffee ☕️
                </div>
                <div className="text-sm text-gray-500">View all 12 comments</div>
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
  )
}