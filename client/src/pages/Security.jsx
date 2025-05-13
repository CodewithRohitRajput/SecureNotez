// Security.js
import React from 'react'
import { Link } from 'react-router-dom'

const Security = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-bold'>🔒 SecureNotez</h1>
      <p className='text-lg'>You need to login to access your notes</p>
      <div className='flex gap-4'>
        <Link to={'/Signup'}>
          <button className='px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition'>
            Signup
          </button>
        </Link>
        <Link to={'/Signup'}>
          <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Security