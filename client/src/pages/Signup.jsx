import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emaill, setEmaill] = useState('')
  const [passwordl, setPasswordl] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3000/user/signup`, { username, email, password }, { withCredentials: true })
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3000/user/login`, { email: emaill, password: passwordl }, { withCredentials: true })
      setEmaill('')
      setPasswordl('')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900 px-4 pt-8 md:pt-0 pb-8">
      <div className="flex-grow">
        <h1 className="text-center text-2xl md:text-4xl font-mono text-white mb-8 md:mb-0 md:translate-y-28">
          Welcome to <span className="text-blue-400">SecureNotez</span>
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 w-full md:mt-44">
          <div className="w-full md:w-2/5 bg-blue-400 rounded-3xl border-4 border-white p-4 md:p-6 hover:scale-105 md:hover:scale-125 transition-all duration-300">
            <p className="text-center text-lg md:text-xl font-mono text-white mb-4 md:mt-4 md:mb-6">
              Create new account
            </p>
            <form onSubmit={handleSignup} className="flex flex-col items-center gap-y-4 md:gap-y-8 md:mt-7 md:mb-5">
              <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full md:w-2/4 h-9 md:h-10 border-2 border-white px-2 py-1 md:py-2 bg-blue-400 placeholder:text-gray-600 outline-none rounded-md hover:bg-white transition-all duration-200 hover:border-black text-sm md:text-base"
              />
              <input
                defer={true}
                type="email"
                value={email}
                placeholder="xyz@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-2/4 h-9 md:h-10 border-2 border-white px-2 py-1 md:py-2 bg-blue-400 placeholder:text-gray-600 outline-none rounded-md hover:bg-white transition-all duration-200 hover:border-black text-sm md:text-base"
              />
              <input
                type="password"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full md:w-2/4 h-9 md:h-10 border-2 border-white px-2 py-1 md:py-2 bg-blue-400 placeholder:text-gray-600 outline-none rounded-md hover:bg-white transition-all duration-200 hover:border-black text-sm md:text-base"
              />
              <button
                type="submit"
                className="w-2/3 md:w-1/3 py-1 md:py-2 bg-white rounded-lg text-blue-500 border-4 border-blue-200 text-sm md:text-lg font-mono hover:bg-gray-200 active:scale-105 transition-all duration-200"
              >
                Signup
              </button>
            </form>
          </div>

          <div className="w-full md:w-2/5 bg-white rounded-3xl border-4 border-blue-400 p-4 md:p-6 hover:scale-105 md:hover:scale-125 transition-all duration-300">
            <p className="text-center text-lg md:text-xl font-mono text-blue-400 mb-4 md:mt-4 md:mb-6 md:translate-y-2">
              Welcome Back
            </p>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-y-4 md:gap-y-10 md:mt-10 md:mb-16">
              <input
                defer={true}
                type="email"
                value={emaill}
                placeholder="xyz@gmail.com"
                onChange={(e) => setEmaill(e.target.value)}
                className="w-full md:w-2/4 h-9 md:h-10 border-2 border-blue-400 px-2 py-1 md:py-2 outline-none rounded-md placeholder:text-gray-600 hover:bg-blue-300 transition-all duration-200 hover:border-black text-sm md:text-base"
              />
              <input
                type="password"
                value={passwordl}
                placeholder="******"
                onChange={(e) => setPasswordl(e.target.value)}
                className="w-full md:w-2/4 h-9 md:h-10 border-2 border-blue-400 px-2 py-1 md:py-2 outline-none rounded-md placeholder:text-gray-600 hover:bg-blue-300 transition-all duration-200 hover:border-black text-sm md:text-base"
              />
              <button
                type="submit"
                className="w-2/3 md:w-1/3 py-1 md:py-2 bg-blue-400 rounded-lg text-white border-4 border-blue-200 text-sm md:text-lg font-mono hover:bg-blue-500 active:scale-105 transition-all duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup