import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SingleNote = () => {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const navigate = useNavigate()

  const handleSingleNoteSee = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/notes/singleNote/${id}`, { withCredentials: true })
      setNote(res.data.seeSingleNote)
    } catch (err) {
      console.error(err)
      navigate('/seeNotes') // Redirect if note fetch fails
    }
  }

  useEffect(() => {
    handleSingleNoteSee()
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900">
      <Navbar />
      {note ? (
        <div className="flex-grow flex flex-col items-center pt-16 sm:pt-20 px-4 sm:px-6 pb-8">
          <h3 className="text-white font-semibold text-lg sm:text-2xl w-full max-w-2xl text-center mb-4 sm:mb-5">
            {note.title}
          </h3>
          <h4 className="text-white font-mono text-base sm:text-lg w-full max-w-2xl break-words">
            {note.description}
          </h4>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center pt-16 sm:pt-20">
          <p className="text-white text-base sm:text-lg font-mono">Loading...</p>
        </div>
      )}
    <Footer/>
    </div>
  )
}

export default SingleNote