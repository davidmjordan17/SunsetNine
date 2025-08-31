import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-black'>Get In Touch</p>
          <p className='text-gray-500'>
            Have questions about your order, returns, or need help with sizing? 
            We're here to help! Reach out to us using the information below.
          </p>

          <div className='space-y-4'>
            <div>
              <p className='font-medium text-black'>Customer Support</p>
              <p className='text-gray-500'>sunsetninegolf@gmail.com</p>
              <p className='text-gray-500 text-sm'>Response time: 24-48 hours</p>
            </div>

            <div>
              <p className='font-medium text-black'>Returns & Exchanges</p>
              <p className='text-gray-500'>sunsetninegolf@gmail.com</p>
              <p className='text-gray-500 text-sm'>Include your order number for faster processing</p>
            </div>

            <div>
              <p className='font-medium text-black'>Business Hours</p>
              <p className='text-gray-500'>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
              <p className='text-gray-500'>Saturday - Sunday: 10:00 AM - 3:00 PM EST</p>
            </div>
          </div>

          <div className='bg-gray-50 p-4 rounded-lg w-full max-w-md'>
            <p className='font-medium text-black mb-2'>Quick Help</p>
            <div className='space-y-1 text-sm text-gray-600'>
              <p>• Returns accepted within 14 days</p>
              <p>• Free exchanges on wrong sizes</p>
              <p>• Sizing guides available on product pages</p>
            </div>
          </div>

          <p className='text-gray-500 text-sm'>
            For fastest service, please include your order number and detailed 
            description of your inquiry when contacting us.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Contact