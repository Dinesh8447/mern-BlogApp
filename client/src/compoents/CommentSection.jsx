import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert, Button, Modal, Textarea } from 'flowbite-react'
import Comment from './Comment'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function CommentSection({ postid }) {
    const { currentuser, error, loading } = useSelector(state => state.user)
    const [comment, setcomment] = useState('')
    const [commenterror, setcommenterror] = useState(null)
    const [comments, setcomments] = useState([])
    const [showmodel, setshowmodel] = useState(false)
    const [commenttodelete, setcommenttodelete] = useState(null)
    const navigate = useNavigate()

    // console.log(comments)

    useEffect(() => {
        try {
            const fetchcomments = () => {
                axios.get(`/comment/getpostcomment/${currentuser._id}`)
                    .then(({ data }) => {
                        setcomments(data)
                    })
                    .catch(e => console.log(e))
            }
            fetchcomments()
        } catch (error) {
            console.log(error)
        }
    }, [postid])


    const handlesubmit = (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            return
        }
        try {
            axios.post('/comment/createcomment', { content: comment, postid, userid: currentuser._id })
                .then(({ data }) => {
                    setcomment('')
                    setcomments([data, ...comments])
                })
                .catch(e => console.log(e))
        } catch (error) {
            setcommenterror(error.message)
        }

    }

    const handlelike = async (commentid) => {
        try {
            if (!currentuser) {
                navigate('/signin')
                return
            }
            axios.put(`/comment/likecomment/${commentid}`)
                .then(({ data }) => {
                    // console.log(data._id === commentid)
                    // console.log({...comment,likes:data.likes})
                    setcomments(comments.map((comment) =>
                        data._id === commentid ? {
                            ...comment,
                            likes: data.likes,
                            numberoflikes: data.numberoflikes
                        } : comment
                    ))
                })
                .catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    const handleeditcomment = async (comment, editedcomment) => {
        setcomments(
            comments.map((c) => c._id === comment._id ? { ...c, content: editedcomment } : c)
        )
    }

    const Handledelete = async (commentid) => {
        try {
            if (!currentuser) {
                navigate('/signin')
                return
            }
            axios.delete(`/comment/deletecomment/${commentid}`)
                .then(({data}) =>{
                    setshowmodel(false)
                   setcomments(comments.filter((c)=>c._id !== commentid))
                    
                })
                .catch((e) => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-3 max-w-2xl mx-auto w-full'>
            {
                currentuser ? (
                    <div className=" flex gap-2 items-center my-4 font-semibold text-gray-600  ">
                        <p>Signed in as:</p>
                        <img src={currentuser.photourl} className='w-10 h-10 object-cover rounded-full' alt="image" />
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
                    <form onSubmit={handlesubmit} className='border border-blue-300 rounded-md p-3'>
                        <Textarea
                            placeholder='Add a comment...'
                            rows='3'
                            maxLength='200'
                            onChange={(e) => setcomment(e.target.value)}
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
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet</p>
            )
                :
                (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p>Comments</p>
                            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                                <p>{comments.length}</p>
                            </div>
                        </div>
                        {comments.map((comments) => (
                            <Comment key={comments._id} comments={comments} handlelike={handlelike}
                                handleeditcomment={handleeditcomment}
                                Handledelete={(commentid) => {
                                    setshowmodel(true)
                                    setcommenttodelete(commentid)
                                }}
                            />
                        ))}
                    </>

                )
            }

            <Modal show={showmodel} size='md' onClose={() => setshowmodel(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
                        <h1 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment</h1>
                        <div className='flex gap-3 justify-center'>
                            <Button color='failure' onClick={()=>Handledelete(commenttodelete)}>
                                Yes i'm sure
                            </Button>
                            <Button color='gray' onClick={() => setshowmodel(false)}>
                                No
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
