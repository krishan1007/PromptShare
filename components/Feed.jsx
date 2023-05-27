'use client'

import { useState,useEffect } from "react";
import PromptCard from "./PromptCard";
import LoadingSpinner from "./LoadingSpinner";

const PromptCardList = ({data,handleTagClick}) => {

  return (
    <div className="mt-16 prompt_layout">
     {data.map((post)=>(
      <PromptCard
      key = {post._id}
      post = {post}
      handleTagClick = {handleTagClick}
      />
     ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setsearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleSearchChange = (e) => {
      setsearchText(e.target.value);
  }
  const handleTagClick = (tag)=>{
    setsearchText(tag)
  }


  useEffect(() => {
    const fetchPosts= async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
      setIsLoading(false);
    }

    fetchPosts();
  },[])

  useEffect(()=>{

    const filteredPosts = posts.filter((post) => {
      return post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase())|| post.creator.username.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredPosts(filteredPosts);

  },[searchText])


  
  


  return (
    <section className="feed">
       <form className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder="search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
       </form>
       
       {isLoading ? <LoadingSpinner/> : <PromptCardList data = {filteredPosts} handleTagClick = {handleTagClick} />}
    </section>
  )
}

export default Feed