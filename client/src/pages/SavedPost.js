import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useGetUserId from '../hooks/useGetUserId';

const SavedPost = () => {

  const [savedPosts, setSavedPosts] = useState([]);

  const userID = useGetUserId();

  useEffect(()=>{
    const fetchSavedPost = async () =>{
      try{
        const res = await axios.get(`http://localhost:3001/blogPosts/savedPosts/${userID}`);
        // console.log(res);
        setSavedPosts(res.data.savedPosts);
        
      }catch(err){
        console.error(err)
      }
    }

    fetchSavedPost();
  },[])

  
  return (
    <div className='flex flex-col w-auto h-auto mx-2 place-items-center'>
      <h1 className='text-center text-4xl font-semibold py-5'> Saved Blog Posts</h1>
      {!savedPosts.length && <h1 className='text-3xl text-center'>Sorry. You Have No Saved Post Yet</h1>}
      <ul className='grid grid-cols-2 gap-2'>
      {savedPosts?.map((post)=>(
        <li key={post._id} className='w-full mx-0 flex flex-col  border-2 border-black bg-slate-100 p-3'>
          <div className='w-full place-items-center mx-0 relative'>
            <h2 className='text-3xl py-2 text-center w-full'>{post.title}</h2>
            <img src={post.imageURL} alt={post.title} className='w-full h-9/12 mx-0'/>
            <p className='text-xl py-3'>{post.description}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default SavedPost;