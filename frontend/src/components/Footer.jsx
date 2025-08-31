import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Footer = () => {

  const year = new Date()

  return (

    <>
      <div className='flex flex-col sm:grid grid-cols[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright {year.getFullYear()} @ SunsetNine.com - All Rights Reserved</p>
        </div>

      </div>
    </>
  )
}

export default Footer