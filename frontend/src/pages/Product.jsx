import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';

const Product = () => {

  const { productID } = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] =useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  
  const fetchProductData = async () => {

    products.map((item)=> {
      if (item._id === productID){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productID, products])

  return productData ? (
    <div className='border-t-2 py-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%'>

            <img src={image} alt="" className='w-full h-auto'/>

          </div>
        </div>

        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index)=>(
                  <button onClick={()=>setSize(item)} key={index} className={`py-2 px-4 bg-gray-300 cursor-pointer rounded-sm ${item === size ? 'bg-green-500' : ''}`}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-500 cursor-pointer'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5 text-gray-300'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

              <p>100% Original Product</p>
              <p>Easy Return & Exchange Policy Within 14 Days</p>

            </div>
        </div>

      </div>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product