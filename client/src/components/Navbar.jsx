import React, { useState } from 'react'
import logo3 from '../images/sn2.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [logged, setIslogged] = useState(false)
  const navigate = useNavigate()

  const handleToggle = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/securityCheck`, { withCredentials: true })
      if (res.data) setIslogged(true)
    } catch (err) {
      setIslogged(false)
    }
  }

  const handleLogout = async () => {
    await axios.post(`http://localhost:3000/user/logout`, {}, { withCredentials: true })
    navigate('/Security')
  }

  return (
    <nav className="w-full bg-blue-400 border-b-8 border-blue-300 flex flex-col sm:flex-row sm:items-center sm:justify-center px-4 py-2">
      <div className="flex items-center justify-center sm:-translate-x-20">
        <img 
          src={logo3} 
          alt="logo" 
          className="h-12 w-12 sm:h-16 sm:w-16 hover:scale-110 transition-all duration-150" 
        />
      </div>
      <ul className="flex flex-col sm:flex-row sm:gap-12 gap-4 font-semibold text-black items-center mt-2 sm:mt-0">
        <li className="text-white text-lg sm:text-2xl font-mono hover:scale-105 transition-all duration-150">
          <Link to="/">Home</Link>
        </li>
        <li className="text-white text-lg sm:text-2xl font-mono hover:scale-105 transition-all duration-150">
          <Link to="/seeNotes">My Notes</Link>
        </li>
        <li className="text-white text-lg sm:text-2xl font-mono hover:scale-105 transition-all duration-150">
          <Link to="/about">About us</Link>
        </li>
        <li className="text-white text-lg sm:text-2xl font-mono hover:scale-105 transition-all duration-150">
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
      <button 
        onClick={handleLogout} 
        className="text-blue-400 bg-white px-2 py-1 rounded-lg text-lg sm:text-2xl font-mono hover:scale-105 transition-all duration-150 mt-2 sm:mt-0 sm:ml-12"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar