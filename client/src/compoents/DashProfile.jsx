import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentuser } = useSelector(state => state.user)
  const [imagefile, setimagefile] = useState(null)
  const [imagefileurl, setimagefileurl] = useState(null)
  const [imagefileuploadprocess, setimagefileuploadprocess] = useState(null)
  const [imagefileuploaderror, setimagefileuploaderror] = useState(null)
  const filepickerref = useRef()

  console.log(imagefile)


  const handleimagechange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setimagefile(file)
      setimagefileurl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (imagefile) {
      uploadimage()
    }
  }, [imagefile])

  const uploadimage = async () => {
    setimagefileuploaderror(null)
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
    const storage = getStorage(app)
    const Filename = new Date().getTime() + imagefile.name
    const storageref = ref(storage, Filename)
    const uploadTask = uploadBytesResumable(storageref, imagefile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setimagefileuploadprocess(progress.toFixed(0))
      },
      (error) => {
        setimagefileuploaderror("Couldn't upload image (File must be less then 2MB)")
        setimagefileuploadprocess(null)
        setimagefile(null)
        setimagefileurl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setimagefileurl(downloadURL)
          }
          )
      }
    )
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4 '>

        <input type='file' accept='image/*' onChange={handleimagechange} ref={filepickerref} hidden />

        <div className='w-32 h-32 relative self-center shadow-md rounded-full' onClick={() => filepickerref.current.click()}>
          {imagefileuploadprocess && (
          <CircularProgressbar 
          value={imagefileuploaderror || 0} 
          text={`${imagefileuploadprocess}%`}
          strokeWidth={5}
          styles={{
            root:{
              width:'100%',
              height:'100%',
              position:'absolute',
              top:0,
              left:0,
            
            },
            path:{
              stroke:`rgba(62,152,199,${imagefileuploadprocess / 100})`,
            }

          }}
          />
          )}
          <img src={imagefileurl || currentuser.photourl} alt="img" className={`rounded-full w-full cursor-pointer h-full border-8 object-cover border-[lightgray] 
          ${imagefileuploadprocess && imagefileuploadprocess < 100 && 'opacity-70'}`} />
        </div>



        {imagefileuploaderror && (<Alert color='failure'>{imagefileuploaderror}</Alert>)}
        
        <TextInput type='text' id="username" placeholder='Username' defaultValue={currentuser.username} />
        <TextInput type='email' id="email" placeholder='Email' defaultValue={currentuser.email} />
        <TextInput type='password' id="password" placeholder='******' />
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
