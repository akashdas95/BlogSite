import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import useGetUserId from '../hooks/useGetUserId.js';
import useGetUserName from '../hooks/useGetUserName.js';

const CreatePost = () => {
  const userID = useGetUserId();
  const username = useGetUserName();
  console.log(username)
  const path = useNavigate();

  const [post,setPost] = useState({
    title:"",
    imageURL: "",
    description: "",
    userOwner: userID,
    userName: username
  })

  const [cookies, _] = useCookies(["access_token"]);

  useEffect(()=>{
    if(cookies.access_token === "undefined"){
      alert(`Log in first`);
      path("/auth");
    }
  },[])
  

  

  const handelChange = (e) =>{
    const {name, value} = e.target;
    setPost({...post,[name]:value});
  }

  const onSubmit = async (e) =>{
     e.preventDefault();
     try{
        await axios.post("http://localhost:3001/blogposts", post,
        {headers:{authorization:cookies.access_token}})
        alert("blogPost created");
        path("/");
     }catch(err){
      if(err.response.status === 401){
        alert(`you are not logged in. login first`);
      }
      if(err.response.status === 403){
        alert(`Invalid Token`);
      }
       console.error(err.response);
     }
  }

  return (
    <div className='flex flex-col w-full mx-0 items-center justify-center h-auto my-5'>
      <h2 className='text-4xl text-center pb-5'>Create Blog post</h2>
      <form onSubmit={onSubmit} className='w-8/12 h-auto border-black border-2 flex flex-col p-5'>
        <label htmlFor="title" className='text-2xl py-1'>Title</label>
        <input type="text" id='title' name='title' onChange={handelChange} className='border-2 border-black p-1'/>

        <label htmlFor="imageUrl" className='text-2xl py-1'>ImageUrl</label>
        <input type="text" id='imageUrl' name='imageURL' onChange={handelChange} className='border-2 border-black p-1'/>

        <label htmlFor="description" className='text-2xl py-1'>Description</label>
        <textarea type="text" id='description' rows="6" name='description' onChange={handelChange} className='border-2 border-black p-1'/>

        <button type='submit' className='px-5 border-2 w-fit mx-auto mt-3 p-1 rounded bg-green-400 hover:tracking-wider duration-300 text-white border-black'>Create post</button>
      </form>
    </div>
  )
}

export default CreatePost;