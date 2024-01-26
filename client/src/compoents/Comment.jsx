import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

export default function Comment({ key, comments }) {

    const [ user,setuser] = useState({})

    

    useEffect(() => {
        const fetchuserforcomments = async () => {
            try {
                axios.get(`/user/${comments.userid}`)
                .then(({data})=>{
                    setuser(data)
                })
                .catch(e=>console.log(e))
            } catch (error) {
                console.log(error)
            }
        }

        fetchuserforcomments()
    }, [comments])
    return (
        <div className='flex gap-2 items-center border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full' src={user.photourl} alt={user.username}  />
            </div>

            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className='font-bold mr-1 text-sm truncate'>{user ? `@${user.username}` : 'anonymous user'}</span>
                    <span className='text-gray-500 text-sm'>{moment(comments.createdAt).fromNow()}</span>
                </div>
                <p className='text-gray-500 pb-2'>{comments.content}</p>
            </div>

        </div>
    )
}
