import React from 'react'
import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom"
import { CardsDetails } from './components/CardsDetails';
import Cards from './components/Cards'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </>
  )
}

export default App