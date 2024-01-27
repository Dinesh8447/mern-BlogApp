import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function DashComments() {
    const { currentuser, error, loading } = useSelector(state => state.user)
    const [comments, setcomments] = useState([])
    const [showmore, setshowmore] = useState(true)
    const [showmodel, setshowmodel] = useState(false)
    const [commentsidtodelete, setcommentsidtodelete] = useState('')

    console.log(showmore)

    const handledeletecomment = async () => {
        setshowmodel(false)
        try {
          axios.delete(`/comment/deletecomment/${commentsidtodelete}`)
            .then(() => {
              setcomments((perv) => perv.filter((user) => user._id !== commentsidtodelete))
              setshowmodel(false)
            })
            .catch(e => console.log(e))
    
        } catch (e) {
          console.log(e)
        }
      }
    

      useEffect(() => {
        const fetchcomments = () => {
    
          axios.get('/comment/getcomments')
            .then(({ data }) => {
                setcomments(data.comments)
                
                if (data.comments.length < 6) {
                setshowmore(true)
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
    
        if (currentuser.isadmin) {
          fetchcomments()
        }
    
      }, [currentuser._id])
    
      const handleshowmore = async () => {
        const startindex = comments.length;
        try {
    
          await axios.get(`/comment/getcomments?startindex=${startindex}`)
            .then(({ data }) => {
              if (data) {
                setcomments((prev) => [...prev, ...data.comments])
              }
              if (data.user.length < 6) {
                setshowmore(true)
              }
            })
    
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
      {currentuser.isadmin && comments.length > 0 ? (

        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Data updated</Table.HeadCell>
              <Table.HeadCell>Comment content </Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>{comment.numberoflikes}</Table.Cell>
                    <Table.Cell>{comment.postid}</Table.Cell>
                    <Table.Cell>{comment.userid}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => { setshowmodel(true); setcommentsidtodelete(comment._id); }} className='text-red-500 font-medium hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
               ))
            }  
         </Table>
          {
            showmore && (
              <button onClick={handleshowmore} className='w-full text-blue-500 self-center font-semibold py-7  '>
                Showmore
              </button>
            )
          }
        </>

      ) : (<p>there is no comments yet</p>)}

      <Modal show={showmodel} size='md' onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
            <h1 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment</h1>
            <div className='flex gap-3 justify-center'>
              <Button color='failure' onClick={handledeletecomment}>
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
