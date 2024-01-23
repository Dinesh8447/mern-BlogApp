import React, { useState } from 'react'
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

export default function CreatePost() {
  const [imagefile, setimagefile] = useState(null)
  const [imagefileuploadprocess, setimagefileuploadprocess] = useState(null)
  const [imagefileuploaderror, setimagefileuploaderror] = useState(null)
  const [formdata, setformdata] = useState(null)



  const handleuploadimage= async()=>{
    try {
      if(!imagefile){
        setimagefileuploaderror('please select an image ')
        return
      }
      setimagefileuploaderror(null)
      const storage = getStorage(app)
      const filename = new Date().getTime() + imagefile.name
      const storageref = ref(storage,filename)
      const uploadtask = uploadBytesResumable(storageref,imagefile)
      console.log('storage:' + storage +"--filename:"+filename+"---storageref:"+ storageref +"---uploadtask:"+uploadtask)
      uploadtask.on(
        'state_changed',
        (snapshot)=>{
          const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setimagefileuploadprocess(process.toFixed(0))
        },
        (error)=>{
          setimagefileuploadprocess(null)
          setimagefileuploaderror('upload failed ')
          // console.log(error)
        },
        ()=>{
          getDownloadURL(uploadtask.snapshot.ref)
          .then(downloadurl=>{
            setimagefileuploadprocess(null)
            setimagefileuploaderror(null)
            setformdata({...formdata,image:downloadurl})
          })
        }
      )
    } catch (error) {
      setimagefileuploadprocess(null)
      setimagefileuploaderror('image upload failed')
      console.log(error)
    }
  }

  return (
    <div className='p-3 max-w-3xl  mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>create a post</h1>
      <form className='flex flex-col gap-4' action="">
              
                    <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                        <TextInput type='text' placeholder='Title required' required id='title' className='flex-1 font-bold'/>
                        <Select className='font-semibold'>
                            <option value="Javascript">Select a category</option>
                            <option value="Ruby">Ruby</option>
                            <option value="GO">go</option>
                            <option value="Java">Java</option>
                        </Select>
                    </div>
           <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={e=>setimagefile(e.target.files[0])}/>
                <Button type='button' disabled={imagefileuploadprocess} gradientDuoTone='pinkToOrange' size='sm' outline onClick={handleuploadimage}>
                    {imagefileuploadprocess ? (
                      <div className='w-16 h-16'>
                        <CircularProgressbar value={imagefileuploadprocess} text={`${imagefileuploadprocess}%` || 0}/>
                      </div>
                    ) : 'Upload Image'}
                </Button>
                {imagefileuploaderror && <Alert color='failure'>
                  {imagefileuploaderror}
                  </Alert>}
           </div>
           <ReactQuill theme="snow" placeholder='Write Something...' className='w-full h-64 mb-12' required />
           <Button type='submit'  gradientDuoTone="purpleToPink" className='text-2xl font-bold' outline>Publish</Button>
      </form>
    </div>
  )
}
