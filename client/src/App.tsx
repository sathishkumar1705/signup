import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from "../src/Components/Signup"
import Login from "../src/Components/Login"
import React from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<Signup />} />
    <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
