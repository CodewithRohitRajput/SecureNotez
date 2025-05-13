import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        axios.post(`https://securenotez.onrender.com/user/login` , {email , password} , {withCredentials : true})
        setEmail('')
        setPassword('')
        navigate('/');
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
