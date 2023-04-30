import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

 const Auth = () => {

  const [login, setLogin] = useState(true);

  return (
    <div className='flex flex-col w-full h-auto place-items-center'>
      {login ? <Login/>  : <Register/> }

      {login? <button onClick={()=>setLogin(false)} className='text-xl'>Don't have an account yet? Register here</button> :
      <button onClick={()=>setLogin(true)} className='text-xl'>Already have an account? Login here</button>}
      
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
      window.localStorage.setItem("username", response.data.username);
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
    <div className='flex w-full mx-0 items-center justify-center h-auto my-5'>
    <form onSubmit={onSubmit} className='w-auto h-auto border-black border-2 flex flex-col p-5 rounded'>
      <h2 className='text-center text-4xl bg-green-400 p-2 mb-3'> {label}</h2>
      <div className='py-3 w-full'>
        <label htmlFor="username" className='text-2xl'>username: </label>
        <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)} className='border-2 border-black'/>
      </div>
      <div className='py-3'>
        <label htmlFor="password" className='text-2xl'>password: </label>
        <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} className='border-2 border-black'/>
      </div>

      <button type='submit' className='border-2 w-fit mx-auto px-3 rounded bg-green-400 border-black'>{label}</button>
    </form>
   </div>
   )
}

export default Auth;