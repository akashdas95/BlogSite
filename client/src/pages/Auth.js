import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

 const Auth = () => {
  return (
    <div>
      <Login/>
      <Register/>
    </div>
  )
}
 
const Login = () =>{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const path = useNavigate();

  const onSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      if(response.data.token){
        path("/")
      }
      else{
        alert(response.data.message);
      }
    }catch(err){
      console.error(err);
    }
  }

  return(
   <Form setUsername={setUsername} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
  )
}


const Register = () =>{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) =>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:3001/auth/register",{
        username,
        password
      });
      alert(`registration complete`)
    }catch(err){
      console.error(err);
    }
  }

  return(
    <Form setUsername={setUsername} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>
  )
}


const Form = ({setUsername,setPassword,label,onSubmit}) =>{
   return(
    <div>
    <form onSubmit={onSubmit}>
      <h2> {label}</h2>
      <div>
        <label htmlFor="username">username: </label>
        <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <button type='submit'>{label}</button>
    </form>
   </div>
   )
}

export default Auth;