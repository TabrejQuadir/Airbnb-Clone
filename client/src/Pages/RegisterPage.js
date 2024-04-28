import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";

const RegisterPage = () => {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  async function registerUser(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name.trim() || !email.trim() || !password.trim()) {
      // If any input is empty, show alert
      alert("Please fill all the fields");
      return; // Exit function
    }

  try {
    await axios.post("/register", {
      name,email,password
    });
    alert("Registeration Successfull!! Now you can Log in");
  } catch (error) {
    alert("Registeration Failed!! Try again Later");
  }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
    <div className='mb-48'>
      <h1 className='text-4xl text-center mb-4'>Register Form</h1>
      <form className='max-w-md mx-auto' onSubmit={registerUser}>
      <input id='name' type='text' placeholder='Enter your name'
       value={name} onChange={e=>setName(e.target.value)} />
        <input id='email' type='email' placeholder='your@gmail.com'
        value={email} onChange={e=>setEmail(e.target.value)} />
        <input id='password' type='password' placeholder='Enter Password' 
        value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className='primary'>Register</button>
        <div className='text-center py-2 text-gray-500'>
          Alredy a member? <Link className='text-black underline' to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegisterPage;