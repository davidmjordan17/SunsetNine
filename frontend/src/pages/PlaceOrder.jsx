import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState('stripe');

  const { navigate, backendUrl, token, cartItems, getCartAmount, delivery_fee, products, setCartItems } = useContext(ShopContext);

  const [formData, setFormData ] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    apt:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    try {

      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        default:
          break;
      }
      
      
    } catch (error) {
      
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

       {/* Left Side */} 
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        <input onChange={onChangeHandler} name='apt' value={formData.apt} type="text" placeholder='Apt #' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zip Code' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-200 rounded py-1.5 px-3.5 w-full'/>
      </div>


      {/* Right Side */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>

          <CartTotal />

        </div>

        <div className='w-full items-center mt-12'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-md cursor-pointer flex items-center justify-center gap-3 mx-auto rounded-4xl'>
            PLACE ORDER WITH 
            <img src={assets.stripe_logo} className='h-5 -mt-1 -ml-1' alt="Stripe" />
          </button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder