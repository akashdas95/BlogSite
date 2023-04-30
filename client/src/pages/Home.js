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
        console.log(res.data);
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
    <div className='flex flex-col w-auto h-auto mx-2 place-items-center '>
      <h1 className='text-center text-4xl font-semibold py-5'>Blog Posts</h1>
      <ul className='grid grid-col-1 md:grid-cols-2 gap-2'>
      {posts?.map((post)=>(
        <li key={post._id} className='w-full mx-0 flex flex-col  border-2 border-black bg-slate-100'>
          <div className='w-full place-items-center mx-0 p-3 relative' >
            <h2 className='text-3xl pt-6 py-2 text-center w-full'>{post.title}</h2>
            <button onClick={()=> savePost(post._id)} disabled={isPostSaved(post._id)} className={`rounded border-2 absolute border-black px-2 top-1 left-1 hover:bg-green-400 ${isPostSaved(post._id)?"bg-green-400":"bg-slate-100"}`} >
              {isPostSaved(post._id)?"saved":"save"}
            </button>
            <img src={post.imageURL} alt={post.title} className='w-full h-1/2 mx-0'/>
            <p className='text-xl py-3'>{post.description}</p>
            <p className='absolute top-1 right-1'>Created by: {post.userName}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default Home;