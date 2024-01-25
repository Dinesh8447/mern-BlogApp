import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Alert, Button, Textarea } from 'flowbite-react'

export default function CommentSection({ postid }) {
    const { currentuser, error, loading } = useSelector(state => state.user)
    const [comment,setcomment] = useState('')
    const [commenterror,setcommenterror] = useState(null)
    const handlesubmit = (e) =>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        try {
        axios.post('/comment/createcomment',{content:comment,postid,userid:currentuser._id})
        .then(({data})=>{
            setcomment('')
            setcomment(null)
            console.log(data)
        })
        .catch(e=>console.log(e))
    } catch (error) {
        setcommenterror(error.message)
    }

    }
    return (
        <div className='p-3 max-w-2xl mx-auto w-full'>
            {
                currentuser ? (
                    <div className=" flex gap-2 items-center my-4 font-semibold text-gray-600  ">
                        <p>Signed in as:</p>
                        <img src={currentuser.photourl} className='w-10 h-10 object-cover rounded-full' alt="image"/>
                        <Link className='text-sm text-blue-600 hover:underline' to='/dashboard?tab=profile'>
                            @{currentuser.username}
                        </Link>
                    </div>
                ) :
                    (
                        <div className='text-sm flex gap-2 my-5 text-teal-400'>
                            You must be signed in to comment
                            <Link className='text-blue-500 hover:underline ' to={'/signin'}>
                            signIn
                            </Link>
                        </div>
                    )
            }

            {
                currentuser && (
                    <form  onSubmit={handlesubmit} className='border border-blue-300 rounded-md p-3'>
                        <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e)=>setcomment(e.target.value)}
                        value={comment}
                        />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-sm'>{200 - comment.length} character remaining</p>
                            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                                Submit
                            </Button>
                        </div>
                        {commenterror && 
                        <Alert color='failure' className='mt-5'>
                            {commenterror}
                        </Alert>
                        }
                    </form>
                )
            }
        </div>
    )
}
