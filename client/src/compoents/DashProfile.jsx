import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function DashProfile() {
  const { currentuser } = useSelector(state => state.user)
  const [imagefile,setimagefile] = useState(null)
  const [imagefileurl,setimagefileurl]= useState(null)
  const filepickerref = useRef()
  
  
  const handleimagechange = (e) =>{
    const file = e.target.files[0]
    if(file){
      setimagefile(file)
      setimagefileurl(URL.createObjectURL(file))
    }
  }

  useEffect(()=>{
      if(imagefile){
        uploadimage()
      }    
  },[imagefile])

const uploadimage = async() =>{
  // service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size<2 * 1024 * 1024 &&
  //       request.resource.contentType.matches('image/.*')
       
  //     }
  //   }
  // }    
}

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 '>

        <input type='file' accept='image/*' onChange={handleimagechange} ref={filepickerref} hidden  />
        
        <div className='w-32 h-32 self-center shadow-md rounded-full'  onClick={()=>filepickerref.current.click()}>
        <img src={imagefileurl || currentuser.profilepicture} alt="img" className='rounded-full w-full cursor-pointer h-full border-8 object-cover border-[lightgray]' srcset="" />
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
