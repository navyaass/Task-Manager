import React from 'react'
import { useState } from 'react'

const Register = () => {

  const [formData,setFormData ]= useState({name:"",email:"",password:""})

  return (
    <div>
      <div>
        <h1 className='text-4xl text-center m-10 font-bold'>Task Manager</h1>
        <h1 className='text-2xl text-center mt-15 font-bold'>Register</h1><br/>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col '>
            <p>Enter Name:</p>
            <input type='text' className='border-1 border-gray-400 p-2 rounded w-[400px]'/>
          </div>
          <div className='flex flex-col '>
            <p>Enter Email:</p>
             <input type='text' className='border-1 border-gray-400 p-2 rounded w-[400px]'/>
          </div>
          <div className='flex flex-col '>
            <p>Enter Password:</p>
             <input type='text' className='border-1 border-gray-400 p-2 rounded w-[400px]'/>
          </div>
          <button className='mt-8 bg-blue-400 p-4 rounded-2xl text-white hover:bg-blue-900 cursor-pointer'>Register</button>
        </div>
        
      </div>

    </div>
  )
}

export default Register
