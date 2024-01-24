import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'



export default function DashPost() {
  const { currentuser, error, loading } = useSelector(state => state.user)
  const [userpost, setuserpost] = useState([])
  const [showmore, setshowmore] = useState(true)
  const [showmodel, setshowmodel] = useState(false)
  const [postidtodelete, setpostidtodelete] = useState('')

  console.log(userpost)

  const handledeletepost = async () => {
    setshowmodel(false)
    try {
      axios.delete(`/post/delete/${postidtodelete}/${currentuser._id}`)
        .then(() => {
          setuserpost((perv) => perv.filter((post) => post._id !== postidtodelete))
        })
        .catch(e => console.log(e))

    } catch (e) {
      console.log(e)
    }
  }

  // console.log(userpost)
  useEffect(() => {
    const fetchpost = () => {

      axios.get(`/post/get?userid=${currentuser._id}`)
        .then(({ data }) => {
          // console.log(data)
          setuserpost(data.posts)
          if (data.posts.length < 9) {
            setshowmore(false)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }

    if (currentuser.isadmin) {
      fetchpost()
    }

  }, [currentuser._id])

  const handleshowmore = async () => {
    const startindex = userpost.length;
    try {

      await axios.get(`/post/get?userid=${currentuser._id}&startindex=${startindex}`)
        .then(({ data }) => {
          if (data) {
            setuserpost((prev) => [...prev, ...data.posts])
          }
          if (data.posts.length < 9) {
            setshowmore(false)
          }
        })

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
      {currentuser.isadmin && userpost.length > 0 ? (

        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Data updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell><span>Edit</span></Table.HeadCell>
            </Table.Head>
            {
              userpost.map((post) => (
                <Table.Body className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell><Link to={`/post/${post.slug}`}><img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-slate-500' /></Link></Table.Cell>
                    <Table.Cell><Link className='font-semibold text-gray-500 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => { setshowmodel(true); setpostidtodelete(post._id); }} className='text-red-500 font-medium hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell><Link className='text-blue-500 font-medium hover:underline cursor-pointer' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link></Table.Cell>
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

      ) : (<p>there is no post</p>)}

      <Modal show={showmodel} size='md' onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
            <h1 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post</h1>
            <div className='flex gap-3 justify-center'>
              <Button color='failure' onClick={handledeletepost}>
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
