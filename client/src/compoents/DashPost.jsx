import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'



export default function DashPost() {
  const { currentuser,error,loading } = useSelector(state => state.user)
  const [userpost, setuserpost] = useState([])

  console.log(userpost)
  useEffect(()=>{
    const fetchpost = () =>{

      axios.get(`/post/get?userid=${currentuser._id}`)
      .then(({data})=>{
          // console.log(data)
          setuserpost(data.posts)
      })
      .catch(e=>{
        console.log(e)
      })
    }

    if(currentuser.isadmin){
      fetchpost()
    }

  },[currentuser._id])

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
            userpost.map((post)=>(
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell><Link to={`/post/${post.slug}`}><img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-slate-500'/></Link></Table.Cell>
                  <Table.Cell><Link className='font-semibold text-gray-500 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell><span className='text-red-500 font-medium hover:underline cursor-pointer'>Delete</span></Table.Cell>
                  <Table.Cell><Link className='text-blue-500 font-medium hover:underline cursor-pointer' to={`/update-post/${post._id}`}><span>Edit</span></Link></Table.Cell>
                </Table.Row>
              </Table.Body>
            ))
          }
        </Table>
      </>
      
      ) : (<p>there is no post</p>)}
    </div>
  )
}
