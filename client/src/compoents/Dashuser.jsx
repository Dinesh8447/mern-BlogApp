import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function Dashuser() {

    const { currentuser, error, loading } = useSelector(state => state.user)
    const [user, setuser] = useState([])
    const [showmore, setshowmore] = useState(true)
    const [showmodel, setshowmodel] = useState(false)
    const [useridtodelete, setuseridtodelete] = useState('')
  

    const handledeleteuser = async () => {
        setshowmodel(false)
        try {
          axios.delete(`/user/delete/${useridtodelete}`)
            .then(() => {
              setuser((perv) => perv.filter((user) => user._id !== useridtodelete))
              setshowmodel(false)
            })
            .catch(e => console.log(e))
    
        } catch (e) {
          console.log(e)
        }
      }
    

      useEffect(() => {
        const fetchuser = () => {
    
          axios.get(`user/getusers`)
            .then(({ data }) => {
                setuser(data.users)
                
                if (data.users.length < 9) {
                setshowmore(false)
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
    
        if (currentuser.isadmin) {
          fetchuser()
        }
    
      }, [currentuser._id])
    
      const handleshowmore = async () => {
        const startindex = user.length;
        try {
    
          await axios.get(`/user/getusers?startindex=${startindex}`)
            .then(({ data }) => {
              if (data) {
                console.log(data)
                setuser((prev) => [...prev, ...data.users])
              }
              if (data.user.length < 9) {
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
      {currentuser.isadmin && user.length > 0 ? (

        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Data created</Table.HeadCell>
              <Table.HeadCell>user image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {
              user.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                        <img src={user.photourl} alt='profile' className='w-10 h-10 object-cover rounded-full bg-slate-500' />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isadmin ? <FaCheckCircle color='#00ff00'/> : <FaTimesCircle color='red'/>}</Table.Cell>
                    <Table.Cell>
                      <span onClick={() => { setshowmodel(true); setuseridtodelete(user._id); }} className='text-red-500 font-medium hover:underline cursor-pointer'>
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

      ) : (<p>there is no user yet</p>)}

      <Modal show={showmodel} size='md' onClose={() => setshowmodel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto ' />
            <h1 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this user</h1>
            <div className='flex gap-3 justify-center'>
              <Button color='failure' onClick={handledeleteuser}>
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
