import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const EditNote = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleEditNote = async () => {
    try {
      const res = await axios.get(`https://securenotez.onrender.com/notes/singleNote/${id}`, { withCredentials: true })
      setTitle(res.data.seeSingleNote.title)
      setDescription(res.data.seeSingleNote.description)
    } catch (err) {
      console.error(err)
      navigate('/seeNotes') // Redirect if fetch fails
    }
  }

  useEffect(() => {
    handleEditNote()
  }, [])

  const saveChanges = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`https://securenotez.onrender.com/notes/editNote/${id}`, { title, description }, { withCredentials: true })
      setTitle('')
      setDescription('')
      navigate('/seeNotes')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-200 to-white">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 sm:py-20">
        <div className="w-full max-w-lg sm:max-w-2xl flex flex-col items-center">
          <form onSubmit={saveChanges} className="flex flex-col items-center gap-y-4 sm:gap-y-8 w-full">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full sm:w-3/4 h-12 sm:h-16 border-2 border-blue-500 rounded-md outline-none px-3 sm:px-4 py-2 placeholder:text-base sm:placeholder:text-xl text-base sm:text-lg font-semibold hover:border-4 transition-all duration-100"
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
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditNote
