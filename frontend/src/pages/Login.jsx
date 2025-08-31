import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets/frontend_assets/assets';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      if (currentState === 'Sign Up') {
        
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div 
      className='min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative'
      style={{ backgroundImage: `url(${assets.hero_img})` }}
    >
      {/* Backdrop overlay */}
      <div className='absolute inset-0 bg-opacity-30 backdrop-blur-md'></div>
      
      {/* Form container */}
      <div className='relative z-10 w-full max-w-md mx-4'>
        <form 
          onSubmit={onSubmitHandler} 
          className='bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white border-opacity-20'
        >
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>{currentState}</h1>
            <div className='w-20 h-1 bg-black mx-auto rounded-full'></div>
            <p className='text-gray-600 mt-4'>
              {currentState === 'Login' ? 'Welcome back to SunsetNine' : 'Join the SunsetNine family'}
            </p>
          </div>

          {/* Form fields */}
          <div className='space-y-6'>
            {currentState === 'Sign Up' && (
              <div>
                <input 
                  onChange={(e)=>setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className='w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-lg' 
                  placeholder='Full Name' 
                  required
                />
              </div>
            )}
            
            <div>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-lg' 
                placeholder='Email Address' 
                required
              />
            </div>
            
            <div>
              <input 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} 
                type="password" 
                className='w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-lg' 
                placeholder='Password' 
                required
              />
            </div>
          </div>

          {/* Footer links */}
          <div className='flex justify-between items-center mt-6 text-sm'>
            <p className='text-gray-600 hover:text-black cursor-pointer transition-colors'>
              Forgot Password?
            </p>
            <p 
              onClick={()=>setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
              className='text-black font-medium hover:text-gray-700 cursor-pointer transition-colors'
            >
              {currentState === 'Login' ? 'Create Account' : 'Back to Login'}
            </p>
          </div>

          {/* Submit button */}
          <button 
            type='submit'
            className='w-full bg-black text-white font-medium py-4 mt-8 rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-lg'
          >
            {currentState === 'Login' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Additional info */}
          <p className='text-center text-xs text-gray-500 mt-6'>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login