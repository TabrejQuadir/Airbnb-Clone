import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser}= useContext(UserContext)

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      setUser(response.data)
      alert("Login Successfull!!");
      setRedirect(true);
    } catch (e) {
      alert("Login Failed!!", e);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-48'>
        <h1 className='text-4xl text-center mb-4'>Login Form</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
          <input type='email' placeholder='your@gmail.com'
            value={email} onChange={e => setEmail(e.target.value)} />
          <input type='password' placeholder='Enter Password'
            value={password} onChange={e => setPassword(e.target.value)} />
          <button className='primary hover:bg-pink-600 active:bg-pink-800'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?
            <Link className='text-black underline' to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;


