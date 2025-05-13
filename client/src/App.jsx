import { useState } from 'react'

import Home from './pages/Home'
import {Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ViewNote from './pages/ViewNote'
import SingleNote from './pages/SingleNote'
import EditNote from './pages/EditNote'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Security from './pages/Security'

function App() {

  return (
    <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/seeNotes' element={<ViewNote/>} />
    <Route path='/SingleNote/:id' element={<SingleNote/>} />
    <Route path='/EditNote/:id' element={<EditNote/>} />
    <Route path='/Signup' element={<Signup/>} />
    <Route path='/Login' element={<Login/>} />
    <Route path='/security' element={<Security/>} />

   </Routes>
    </BrowserRouter>
  
  )
}

export default App
