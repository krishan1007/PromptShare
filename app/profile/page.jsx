'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import {  redirect, useRouter } from "next/navigation"
import { toast } from "react-toastify";
import Profile from "@components/Profile"
import LoadingSpinner from "@components/LoadingSpinner";



const MyProfile = () => {

  const { isAuthenticated } = useSession();

  
    const router = useRouter();
    const handleEdit = (post) =>{
       router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
         const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
         if(hasConfirmed){
         try {
          const response = await fetch(`/api/prompt/${post._id.toString()}`,
           {
            method:'DELETE',
           }
           )

           const filteredPosts = posts.filter((p) => p._id!==post._id );

           setPosts(filteredPosts);

           if(response.ok)
           {
            router.push('/profile');
           }
           
         } catch (error) {
          console.log(error);
         }
        }
    }

    const {data:session} = useSession()

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts= async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
        
          setPosts(data);
          setLoading(false);
        }
    
        
        if(!session){
          toast("Bhai Login karle Pahle", { hideProgressBar: true, autoClose: 2000, type: 'success' });
          router.push("/");
        }
        if(session?.user.id) fetchPosts();
      },[])

  return(
   loading?<LoadingSpinner />: <Profile
      name = "My"
      desc = "Welcome to your personalized profile page"
      data={posts}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
    />
  )
}

export default MyProfile