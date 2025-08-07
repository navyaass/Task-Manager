import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [formData,setFormData ]= useState({email:"",password:""})
  const  navigate= useNavigate()

  

  const loginUser = async() =>{
    try{
      let res = await axios.post('http://localhost:8000/api/auth/login',formData)
      localStorage.setItem("token",res.data.token);
      navigate('/dashboard')
      console.log(res.data)
    }catch(error){
      console.log("error occured..",error.response.data)

    }
  }

  return (
    <div>
      <div>
        <h1 className='text-4xl text-center m-10 font-bold'>Task Manager</h1>
        <h1 className='text-2xl text-center mt-15 font-bold'>Login</h1><br/>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col '>
            <p>Enter Email:</p>
             <input type='text' value={formData.email}  onChange={(e)=>setFormData({...formData,email:e.target.value})}  className='border-1 border-gray-400 p-2 rounded w-[400px]'/>
          </div>
          <div className='flex flex-col '>
            <p>Enter Password:</p>
             <input type='text' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} className='border-1 border-gray-400 p-2 rounded w-[400px]'/>
          </div>
          <button onClick={()=>loginUser()} className='mt-8 bg-blue-400 p-4 rounded-2xl text-white hover:bg-blue-900 cursor-pointer w-[400px]'>Login</button><br/>
          <p>Don't Have an account?<Link to='/register'><span className='text-blue-600 cursor-pointer'>Register</span></Link> </p> 
        </div>
        
      </div>

    </div>
  )
}

export default Login
