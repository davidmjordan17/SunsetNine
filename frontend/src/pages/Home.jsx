import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <OurPolicy />
      <Footer />
    </div>
  )
}

export default Home