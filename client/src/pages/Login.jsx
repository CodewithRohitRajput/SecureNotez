import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Login = () => {
    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')
    const navigate = useNavigate();    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
            const response = await api.post('/user/login', {email, password});
            
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                navigate('/');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
        }
    }

    

  

  return (
    <div>
      <form action="" onSubmit={handleLogin} >
        <input type="email" value={email} placeholder='xyz@gmail.com' onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" value={password} placeholder='******' onChange={(e)=>setPassword(e.target.value)} />
        <div>
            <button type='submit' >
                Login
            </button>
            <p>don't have an account ? <a href="/Signup">Signup</a></p>
        </div>
      </form>
    </div>
  )
}

export default Login
