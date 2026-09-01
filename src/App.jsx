import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import DataSiswa from './components/DataSiswa'
import FormSiswa from './components/FormSiswa'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import User from './pages/User'

function counter() { }

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/user" element={<User />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
