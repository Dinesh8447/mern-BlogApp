import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios'
import { useNavigate ,useParams} from 'react-router-dom';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';

export default function Updatepost() {
  const { currentuser } = useSelector(state => state.user)
    const [imagefile, setimagefile] = useState(null)
    const [imagefileuploadprocess, setimagefileuploadprocess] = useState(null)
    const [imagefileuploaderror, setimagefileuploaderror] = useState(null)
    const [formdata, setformdata] = useState({})
    const [publisherror, setpublisherror] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
  // console.log(id)
  // console.log(currentuser._id)


  useEffect(()=>{
    const fetchdata = async()=>{
        axios.get(`/post/get?posts?postid=${id}`)
        .then(({data})=>{
            setpublisherror(null)
            setformdata(data.posts[0])
        })
        .catch(e=>{
            setpublisherror(e.response.data.message)
            console.log(e)
        })
    }
    fetchdata()

  },[])
  
  const handleupdate = (e) =>{
    e.preventDefault()
    try {
    axios.put(`/post/updatepost/${id}/${currentuser._id}`,formdata)
    .then(({data})=>{
      console.log(data)
      setpublisherror(null)
      navigate(`/post/${data.slug}`)
  
    })
    .catch((e)=>{
      // console.log(e)
      setpublisherror(e.response.data.message)
    })  
  
  } catch (error) {
    setpublisherror('something went worng')
  
  }
  }
  
  
  
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
        // console.log('storage:' + storage +"--filename:"+filename+"---storageref:"+ storageref +"---uploadtask:"+uploadtask)
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
        <form onSubmit={handleupdate} className='flex flex-col gap-4'>
                
                      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                          <TextInput type='text' value={formdata.title} placeholder='Title required' 
                          onChange={(e)=>setformdata({...formdata,title:e.target.value})} 
                          required id='title' 
                          className='flex-1 font-bold'/>
                          <Select value={formdata.category} onChange={(e)=>setformdata({...formdata,category:e.target.value})} className='font-semibold'>
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
                
             </div>
  
                  {imagefileuploaderror &&(<Alert color='failure'>{imagefileuploaderror}</Alert>)}
                  {formdata.image && (<img src={formdata.image} className='w-full h-72 object-cover'/>)}
             
             <ReactQuill onChange={(value)=>{setformdata({...formdata,content:value})}} theme="snow" placeholder='Write Something...' className='w-full h-64 mb-12' required />
             <Button type='submit'  gradientDuoTone="purpleToPink" className='text-2xl font-bold' outline>Update Post</Button>
             {publisherror && (<Alert color='failure' className='font-semibold mt-5' >{publisherror}</Alert>)}
        </form>
      </div>
    )
}
