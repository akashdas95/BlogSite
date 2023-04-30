import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import useGetUserName from '../hooks/useGetUserName';

function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"]);
  const userName = useGetUserName();
  

  const path = useNavigate();

  const Logout = () => {
   setCookies("access_token", "undefined");
   window.localStorage.removeItem("userID");
   window.localStorage.removeItem("username");
   path("/auth");
  }


  return (
    <div className='flex w-full mx-0 p-5 bg-green-400 '>
    <div className={`${userName ? "w-5/12":"w-8/12"} h-auto`}>
      <h1 className='text-3xl w-fit font-extrabold hover:cursor-pointer hover:tracking-wider duration-300 '>HOW TO?</h1>
    </div>
    {userName && <h1 className='w-3/12 text-2xl font-semibold text-white'>hello! {userName}</h1>}
    <div className='flex text-2xl gap-5'>
      <Link to="/" className='hover:scale-105 duration-300 hover:text-white '>Home</Link>
      <Link to="/createPost" className='hover:scale-105 duration-300 hover:text-white '>Create Post</Link>
      
      {cookies.access_token === "undefined" || !cookies.access_token ?
       (<Link to="/auth" className='hover:scale-105 duration-300 hover:text-white'>Register/Login</Link>) : ( 
        <>
          <Link to="/savedPost" className='hover:scale-105 duration-300 hover:text-white'>Saved Post</Link>
          <button className='hover:scale-105 duration-300 hover:text-red-700' onClick={Logout}>Logout</button>
        </>
        )
      }
      </div>
    </div>
  )
}

export default Navbar;