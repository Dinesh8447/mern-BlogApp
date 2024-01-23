import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updatefailuer,updatesuccess,updatestart, deleteuserfailuer, deleteuserstart, deleteusersuccess, signoutsuccess } from '../../redux/user/userSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function DashProfile() {
  const { currentuser,error,loading } = useSelector(state => state.user)
  const [imagefile, setimagefile] = useState(null)
  const [imagefileurl, setimagefileurl] = useState(null)
  const [imagefileuploadprocess, setimagefileuploadprocess] = useState(null)
  const [imagefileuploaderror, setimagefileuploaderror] = useState(null)
  const [imagefileuploading, setimagefileuploading] = useState(false)
  const [updateusersuccess, setupdateusersuccess] = useState(null)
  const [UpdateError, setUpdateError] = useState(null)
  const [showmodel, setshowmodel] = useState(false)

  const [formdate, setformdate] = useState({})
  const dispatch = useDispatch()
  const filepickerref = useRef()

  // console.log(formdate)


  const handleimagechange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setimagefile(file)
      setimagefileurl(URL.createObjectURL(file))
    }
  }

  const handlechange = (e) =>{
    setformdate({
      ...formdate,
      [e.target.id] : e.target.value
    })
  }

  const handledeleteuser = async() =>{
      setshowmodel(false)
      try {
        dispatch(deleteuserstart)
        axios.delete(`/user/delete/${currentuser._id}`)
        .then(({data})=>{
          dispatch(deleteusersuccess(data))
        })
        .catch(e=>{
          dispatch(deleteuserfailuer(e.response.data.message))
        })
      } catch (e) {
        dispatch(deleteuserfailuer(e.response.data.message))
      }
  }


  const handlesubmit = async(e) =>{
    e.preventDefault()
    if(Object.keys(formdate).length === 0){
      setUpdateError('No changes')
      return
    }
    // if(setimagefileuploading){
    //   return
    // }
    try {
      dispatch(updatestart())
     await axios.put(`/user/update/${currentuser._id}`,formdate)
      .then(({data})=>{
        // console.log(data)
        dispatch(updatesuccess(data))
        setupdateusersuccess("User's update successfully")
        setUpdateError(null)
      })
      .catch(e=>{
        dispatch(updatefailuer(e.response.data.message))
        setupdateusersuccess(null)
        setUpdateError(e.response.data.message)
      })
    } catch (e) {
      dispatch(updatefailuer(e.response.data.message))
      setupdateusersuccess(null)
      setUpdateError(e.response.data.message)
    }

  }

  const handlesignout = () =>{
    try {
      axios.post('/user/signout')
      .then(()=>{
        dispatch(signoutsuccess())
        console.log('sign out')
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (imagefile) {
      uploadimage()
    }
  }, [imagefile])

  const uploadimage = async () => {
    setimagefileuploading(true)
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
        setimagefileuploading(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setimagefileurl(downloadURL)
            setformdate({...formdate,photourl:downloadURL})
            setimagefileuploading(false)
          }
          )
      }
    )
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form  onSubmit={handlesubmit} className='flex flex-col gap-4 '>

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
        
        <TextInput type='text' id="username" placeholder='Username' onChange={handlechange} defaultValue={currentuser.username} />
        <TextInput type='email' id="email" placeholder='Email' onChange={handlechange} defaultValue={currentuser.email} />
        <TextInput type='password' id="password" onChange={handlechange} placeholder='******' />
        <Button type='submit' className='font-bold' gradientDuoTone='purpleToBlue' outline disabled={loading || imagefileuploading}>
          {loading ? "Loading" : "Update"}
        </Button>
        {currentuser.isadmin && (
          <Link to={'/Createpost'}>
          
          <Button type='button' gradientDuoTone='purpleToBlue' className='w-full' >
              Create Post
          </Button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5 items-center'>
        <span onClick={()=>setshowmodel(true)} className='cursor-pointer'>Delete Account</span>
        <span  onClick={handlesignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateusersuccess && (
        <Alert color='success' className='mt-5'>
            {updateusersuccess}
        </Alert>
      )}

{error && (
        <Alert color='success' className='mt-5'>
            {error}
        </Alert>
      )}

{UpdateError && (
        <Alert color='failure' className='mt-5'>
            {UpdateError}
        </Alert>
      )}

      <Modal show={showmodel} size='md' onClose={()=>setshowmodel(false)} popup>
            <Modal.Header/>
            <Modal.Body>
              <div className="text-center">
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
              <h1 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account</h1>
              <div className='flex gap-3 justify-center'>
                <Button color='failure' onClick={handledeleteuser}>
                    Yes i'm sure
                </Button>
                <Button color='gray' onClick={()=>setshowmodel(false)}>
                    No
                </Button>
              </div>
              </div>
            </Modal.Body>

      </Modal>
    </div>
  )
}
