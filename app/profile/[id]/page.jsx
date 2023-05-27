'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"

import Profile from "@components/Profile"



const UserProfile = (params) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name')
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts= async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if(userId) fetchPosts();
      },[])
  return (
    <Profile
      name = {name}
      desc = "Welcome to your personalized profile page"
      data={posts}
    />
  )
}

export default UserProfile