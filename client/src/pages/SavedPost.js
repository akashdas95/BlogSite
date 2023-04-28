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
    <div>
      <h1> Saved Blog Posts</h1>
      <ul>
      {!savedPosts.length && <h1>Sorry. You Have No Saved Post Yet</h1>}
      {savedPosts?.map((post)=>(
        <li key={post._id}>
          <div>
            <h2>{post.title}</h2>
            <img src={post.imageURL} alt={post.title}/>
            <p>{post.description}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default SavedPost;