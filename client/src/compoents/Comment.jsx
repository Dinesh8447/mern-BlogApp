import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'

export default function Comment({ comments, handlelike,handleeditcomment,Handledelete}) {
    const { currentuser } = useSelector(state => state.user)
    const [user, setuser] = useState({})
    const [isediting, setisediting] = useState(false)
    const [editedcontent, seteditedcontent] = useState(comments.content)

    useEffect(() => {
        const fetchuserforcomments = async () => {
            try {
                axios.get(`/user/${comments.userid}`)
                    .then(({ data }) => {
                        setuser(data)
                    })
                    .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
            }
        }

        fetchuserforcomments()
    }, [comments])

    const HandleEdit = async () => {
        setisediting(true)
        seteditedcontent(comments.content)
    }



    const handlesave = async()=>{
        try {
            axios.put(`/comment/editcomment/${comments._id}`,{content:editedcontent})
            .then(()=>{
                setisediting(false)
                handleeditcomment(comments,editedcontent)
            })
            .catch(e=>console.log(e))
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='flex  gap-2 items-center border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full' src={user.photourl} alt={user.username} />
            </div>

            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className='font-bold mr-1 text-sm truncate'>{user ? `@${user.username}` : 'anonymous user'}</span>
                    <span className='text-gray-500 text-sm'>{moment(comments.createdAt).fromNow()}</span>
                </div>
            </div>
            {isediting ? (
                <>
            <Textarea 
            className='mb-2'
            value={editedcontent}
            onChange={(e)=>seteditedcontent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-sm">
                <Button type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={handlesave}>Save </Button>
                <Button type='button' size='sm' gradientDuoTone='purpleToPink' onClick={()=>setisediting(false)} outline>Cancel</Button>
            </div>
            </>
            ) 
            : 
            (
                <>
                    <p className='text-gray-500 pb-2'>{comments.content}</p>

                    <div className="flex gap-2 items-center border-t dark:border-gray-700 max-w-fit">
                        <button type='button' onClick={() => handlelike(comments._id)}
                            className={`text-gray-400 hover:text-blue-500 ${currentuser && comments.likes.includes(currentuser._id) && '!text-blue-500'}`} >
                            <FaThumbsUp className='text-sm' />
                        </button>
                        <p className='text-sm font-semibold'>
                            {
                                comments.numberoflikes > 0 && comments.numberoflikes + " " + (comments.numberoflikes === 1 ? 'Like' : 'Likes')
                            }
                        </p>
                        {
                            currentuser && (currentuser._id === comments.userid || currentuser.isadmin) && (
                                <>
                                <button type='button' className='text-gray-400 hover:text-green-500' onClick={HandleEdit}>Edit</button>
                                <button type='button' className='text-gray-400 hover:text-red-500' onClick={()=>Handledelete(comments._id)}>Delete</button>
                                </>
                            )
                        }

                    </div>
                </>

            )}

        </div>
    )
}
