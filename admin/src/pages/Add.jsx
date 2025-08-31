import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1 ] = useState(false);
  const [image2, setImage2 ] = useState(false);
  const [image3, setImage3 ] = useState(false);
  const [image4, setImage4 ] = useState(false);

  const [name, setName ] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice ] = useState("");
  const [cat, setCat ] = useState("Men");

  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", desc)
      formData.append("price", price)
      formData.append("category", cat)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('');
        setDesc('');
        setPrice('');
        setCat('Men');
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2'>
          Upload Image
        </p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input  onChange={(e)=>setImage2(e.target.files[0])}type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input  onChange={(e)=>setImage3(e.target.files[0])}type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input  onChange={(e)=>setImage4(e.target.files[0])}type="file" id="image4" hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type name here...' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write description here...' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setCat(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e)=>setPrice(e.target.value)} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? 'bg-green-600 text-white' : 'bg-slate-200'} px-3 py-2 cursor-pointer `}>S</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? 'bg-green-600 text-white' : 'bg-slate-200'} px-3 py-2 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? 'bg-green-600 text-white' : 'bg-slate-200'} px-3 py-2 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? 'bg-green-600 text-white' : 'bg-slate-200'} px-3 py-2 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? 'bg-green-600 text-white' : 'bg-slate-200'} px-3 py-2 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>ADD</button>

    </form>
  )
}

export default Add