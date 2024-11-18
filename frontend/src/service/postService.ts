export interface Post {
    id: string;
    username: string;
    image: string;
    caption: string;
    likes: number;
  }
  
  const API_URL = "http://localhost:3001/api/posts";
  
  export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  };
  
  export const createPost = async (username: string, image: string, caption: string): Promise<Post> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, image, caption }),
    });
    const data = await response.json();
    return data;
  };
  
  export const likePost = async (postId: string): Promise<Post> => {
    const response = await fetch(`${API_URL}/${postId}/like`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  };
  