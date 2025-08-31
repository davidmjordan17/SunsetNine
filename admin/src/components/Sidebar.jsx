import React from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from "../assets/admin_assets/assets"

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border border-r-2'>
      <div className='flex flex-col gap-4 pt-6 px-2 pl-[20%] text-[15px]'>
        <NavLink to='/add' className='flex items-center gap-3 px-3 py-2 bg-gray-200'>
          <img src={assets.add_icon} alt="" className='w-5 h-5'/>
          <p className='hidden md:block'>Add Item</p>
        </NavLink>

        <NavLink to='/list' className='flex items-center gap-3 px-3 py-2 bg-gray-200'>
          <img src={assets.order_icon} alt="" className='w-5 h-5'/>
          <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink to='/orders' className='flex items-center gap-3 px-3 py-2 bg-gray-200'>
          <img src={assets.order_icon} alt="" className='w-5 h-5'/>
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar