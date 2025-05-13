import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('https://securenotez.onrender.com/user/securityCheck', { withCredentials: true })
        // If token is valid, stay on the page (do nothing)
      } catch (err) {
        // If token is missing or invalid, redirect to Security page
        navigate('/Security')
      }
    }

    checkAuth()
  }, [navigate])

  const handleCreateNote = async (e) => {
    e.preventDefault()
    await axios.post(`https://securenotez.onrender.com/notes/addNote`, { title, description }, { withCredentials: true })
    setTitle('')
    setDescription('')
    navigate('/seeNotes')
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-200 to-white">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-lg sm:max-w-2xl flex flex-col items-center">
          <p className="text-base sm:text-2xl font-mono text-center mb-6 sm:mb-8">
            <span className="text-blue-400">SecureNotez</span> - <span className="text-gray-500">Not Your Average Note App 🔥</span>
          </p>

          <form onSubmit={handleCreateNote} className="flex flex-col items-center gap-y-4 sm:gap-y-8 w-full">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-12 sm:h-16 border-2 border-blue-500 rounded-md outline-none px-3 sm:px-4 py-2 placeholder:text-base sm:placeholder:text-xl text-base sm:text-lg font-semibold hover:border-4 transition-all duration-100"
            />
            <textarea
              placeholder="What is in your mind...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-36 sm:h-64 border-2 border-blue-500 rounded-md outline-none px-3 sm:px-4 py-2 placeholder:text-base sm:placeholder:text-xl text-base sm:text-lg font-mono hover:border-4 transition-all duration-100"
            />
            <button
              type="submit"
              className="px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-base sm:text-2xl font-mono border-2 border-white rounded-md hover:bg-white hover:border-2 hover:border-blue-600 hover:text-blue-600 transition-all duration-100 active:scale-95"
            >
              Create
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
