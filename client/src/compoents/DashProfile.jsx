import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function DashProfile() {
  const { currentuser } = useSelector(state => state.user)

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 '>
        <div className='w-32 h-32 self-center shadow-md rounded-full'>
        <img src={currentuser.profilepicture} alt="img" className='rounded-full w-full h-full border-8 object-cover border-[lightgray]' srcset="" />
        </div>
        <TextInput type='text' id="username" placeholder='Username' defaultValue={currentuser.username}/>
        <TextInput type='email' id="email" placeholder='Email' defaultValue={currentuser.email}/>
        <TextInput type='password' id="password" placeholder='Password'/>
        <Button type='submit' className='font-bold' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5 items-center'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
