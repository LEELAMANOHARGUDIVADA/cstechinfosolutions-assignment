import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const Routers = () => {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
    </Routes>
  )
}

export default Routers