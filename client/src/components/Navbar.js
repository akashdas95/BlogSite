import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"]);

  const path = useNavigate();

  const Logout = () => {
   setCookies("access_token", "undefined");
   window.localStorage.removeItem("userID");
   path("/auth");
  }

  console.log(cookies);
  return (
    <div className='flex w-full mx-0 p-5 bg-green-400 '>
    <div className='w-1/2 h-auto'>
      <h1 className='text-3xl font-extrabold hover:cursor-pointer hover:tracking-wider duration-300 '>HOW TO?</h1>
    </div>
    <div className='flex text-2xl gap-5'>
      <Link to="/" className='hover:scale-105 duration-300 hover:text-white '>Home</Link>
      <Link to="/createPost" className='hover:scale-105 duration-300 hover:text-white '>Create Post</Link>
      
      {cookies.access_token === "undefined" ?
       (<Link to="/auth" className='hover:scale-105 duration-300 hover:text-white'>Register/Login</Link>) : ( 
        <>
          <Link to="/savedPost" className='hover:scale-105 duration-300 hover:text-white'>Saved Post</Link>
          <button className='hover:scale-105 duration-300 hover:text-red-600' onClick={Logout}>Logout</button>
        </>
        )
      }
      </div>
    </div>
  )
}

export default Navbar;