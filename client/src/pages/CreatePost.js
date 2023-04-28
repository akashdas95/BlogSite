import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import useGetUserId from '../hooks/useGetUserId.js';

const CreatePost = () => {
  const userID = useGetUserId();
  const path = useNavigate();

  const [post,setPost] = useState({
    title:"",
    imageURL: "",
    description: "",
    userOwner: userID
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
        alert("blogPost created")
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
    <div>
      <h2>Create Blog post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' name='title' onChange={handelChange} />

        <label htmlFor="imageUrl">ImageUrl</label>
        <input type="text" id='imageUrl' name='imageURL' onChange={handelChange}/>

        <label htmlFor="description">description</label>
        <textarea type="text" id='description' name='description' onChange={handelChange}/>

        <button type='submit'>Create post</button>
      </form>
    </div>
  )
}

export default CreatePost;