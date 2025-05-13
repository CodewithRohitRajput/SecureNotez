import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

const ViewNote = () => {
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  const handleseeNote = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/notes/seeNote`, { withCredentials: true })
      setNotes(res.data.getNote)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSingleNote = async (id) => {
    navigate(`/SingleNote/${id}`)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/notes/deleteNote/${id}`, { withCredentials: true })
    await handleseeNote()
  }

  const handleEdit = async (id) => {
    navigate(`/EditNote/${id}`)
  }

  useEffect(() => {
    handleseeNote()
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-blue-200 to-white">
      <Navbar />

      <div className="flex-grow flex flex-col items-center px-4 pt-16 sm:pt-20 pb-8">
        <p className="text-center text-gray-500 text-lg sm:text-2xl font-mono mb-4 sm:mb-6">
          Your Notes
        </p>
        <Link to="/">
          <button className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white text-base sm:text-2xl font-mono border-2 border-white rounded-md hover:bg-white hover:border-2 hover:border-blue-600 hover:text-blue-600 transition-all duration-100 active:scale-95 mb-4 sm:mb-6 animate-bounce">
            Go to Home
          </button>
        </Link>

        <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4 sm:gap-6">
          {notes?.map((note) => (
            <div
              key={note._id}
              className="flex flex-col justify-between h-48 sm:h-52 w-full sm:w-64 bg-gradient-to-l from-blue-100 to-white border-2 border-blue-300 rounded-md hover:scale-105 transition-all duration-100 hover:border-black overflow-hidden"
            >
              <div className="p-2 sm:p-3 overflow-hidden">
                <h3 className="text-base sm:text-xl font-semibold text-center mb-1 sm:mb-2">
                  {note.title.split(" ").slice(0, 5).join(" ")}...
                </h3>
                <p className="text-xs sm:text-sm font-mono h-16 sm:h-20 overflow-y-auto break-words">
                  {note.description.split(" ").slice(0, 18).join(" ")}...
                </p>
              </div>

              <div className="flex justify-center items-center gap-1 sm:gap-2 p-2 bg-blue-50 border-t border-blue-200">
                <button
                  onClick={() => handleEdit(note._id)}
                  className="px-2 sm:px-3 py-1 bg-blue-300 rounded-lg text-xs sm:text-sm hover:bg-white transition-all duration-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-2 sm:px-3 py-1 bg-blue-200 rounded-lg text-xs sm:text-sm hover:bg-white transition-all duration-100"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSingleNote(note._id)}
                  className="px-2 sm:px-3 py-1 bg-blue-300 rounded-lg text-xs sm:text-sm hover:bg-white transition-all duration-100"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewNote