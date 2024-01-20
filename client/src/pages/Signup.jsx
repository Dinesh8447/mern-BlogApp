import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Signup() {
const [formdata,setformdata] = useState({})


const handlechange = (e) =>{
  setformdata({
  ...formdata,
  [e.target.id]:e.target.value
  })
}

// console.log(formdata)

const handlesubmit = async(e) =>{
  e.preventDefault()
  try {
   await axios.post('/auth/signup',formdata)
   .then(({data})=>{
    console.log(data)
   })
    .catch(e=>{
      console.log(e)
    })
  } catch (error) {
    console.log(data)    
  }

}




  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto gap-5 flex-col md:flex-row md:items-center'>
        {/* left side */}
        <div className='flex-1'>
          <Link to={'/'} className=' text-4xl  font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Mern</span>Blog
          </Link>
          <p className='text-sm mt-5 font-semibold'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente dolor numquam recusandae ratione enim in ipsum explicabo eius corporis minus porro sint aperiam, eligendi illo tempora cumque voluptate. Iure, aut!</p>
        </div>


        {/* right side */}
        <div className='flex-1'>
          <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
            {/* username */}
            <div>
              <Label  value='Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handlechange}
              />
            </div>

{/* email */}
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handlechange}
              />
            </div>

{/* password */}
            <div>
              <Label value='Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handlechange}
              />
            </div>



          <Button gradientDuoTone='purpleToPink' type='submit'>
            Signup
          </Button>



          </form>

          <div className='flex gap-2 text-sm font-semibold  mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
            Signin
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
