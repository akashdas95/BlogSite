import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import useGetUserId from '../hooks/useGetUserId';

 const Home = () => {

  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserId();

  useEffect(()=>{
    const fetchPost = async () =>{
      try{
        const res = await axios.get("http://localhost:3001/blogPosts")
        setPosts(res.data);
      }catch(err){
        console.error(err)
      }
    }

    const fetchSavedPost = async () =>{
      try{
        const res = await axios.get(`http://localhost:3001/blogPosts/savedPosts/ids/${userID}`)
        setSavedPosts(res.data.savedPosts);
      }catch(err){
        console.error(err)
      }
    }
    
    fetchPost();
    
    if(cookies.access_token !== "undefined" || cookies.access_token !== ""){
      fetchSavedPost();
    }
    
  },[]);

  
  const savePost = async (blogPostID) =>{
    if(cookies.access_token === "undefined"){
      alert(`Log in to save post`);
    }
    else{
      try{
        const res = await axios.put("http://localhost:3001/blogPosts",{blogPostID, userID},
        {headers:{authorization:cookies.access_token}})
        setSavedPosts(res.data.savedPosts);
      }catch(err){
        console.error(err)
      }
    }
    
  }

  const isPostSaved = (id) =>{
    return savedPosts?.includes(id);
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
      {posts?.map((post)=>(
        <li key={post._id}>
          <div>
            <h2>{post.title}</h2>
            <button onClick={()=> savePost(post._id)} disabled={isPostSaved(post._id)} >
              {isPostSaved(post._id)?"saved":"save"}
            </button>
            <img src={post.imageURL} alt={post.title}/>
            <p>{post.description}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Home;