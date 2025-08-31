import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-200'>
      {/*Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-black'>
          <h1 className='text-3xl sm:py-3 lg:text-7xl leading-relaxed sunsetNine'>SunsetNine</h1>
          <div className='flex items-center gap-2 justify-center'>
            <p className='font-semibold text-sm md:text-base'>Nothin' Like It.</p>
          </div>
        </div>
      </div>
      {/*Hero Right Side*/}
      <img src={assets.hero_img} alt="hero-image" className='w-full sm:w-1/2 h-64 sm:h-80 lg:h-96 object-cover'/>
    </div>
  )
}

export default Hero