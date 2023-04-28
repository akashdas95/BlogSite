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
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/createPost">Create Post</Link>
      
      {cookies.access_token === "undefined" ?
       (<Link to="/auth">Register/Login</Link>) : ( 
        <>
          <Link to="/savedPost">Saved Post</Link>
          <button onClick={Logout}>Logout</button>
        </>
        )
      }
    </div>
  )
}

export default Navbar;