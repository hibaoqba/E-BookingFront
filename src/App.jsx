import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/hero/Hero'
import TopNavbar from './components/TopNavbar'
import Destinations from './components/Destinations'

const App = () => {
  return (
    <div>
      <TopNavbar />
      <Navbar />
      <Hero/>
      <Destinations/>
    </div>
  )
}

export default App
