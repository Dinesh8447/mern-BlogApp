import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CallToAction from '../compoents/CallToAction'
import PostCard from '../pages/PostCard'

export default function Home() {
  const [post,setpost] = useState([])
  
  console.log(post)
  useEffect(()=>{
    try {
      
      const fetchpost = async()=>{
        axios.get('/post/get')
        .then(({data})=>{
          setpost(data.posts)
        })
        .catch(e=>console.log(e))
      }
      fetchpost()
      
    } catch (error) {
      console.log(error)
    }
  },[])



  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome To MyBlog</h1>
        <p className='sm:text-sm text-xs text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Debitis iste ad deserunt inventore tempora! Eius quae
          repellat aut vel possimus voluptate dolor enim
          officia repudiandae accusantium omnis sit, recusandae ab.
        </p>
        <Link to='/search' className='text-xs sm:text-sm text-blue-500 font-bold hover:underline'>
          View All
        </Link>
      </div>

      <div className=' p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

    <div className='max-w-6xl mx-auto p-3 flex flex-col  gap-8 py-3'>
        {post && post.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className='text-2xl font-semibold text-center'>Recent Post</h2>
            <div className="flex flex-wrap justify-center  gap-4">
              {post.map((postdata)=>(
                <PostCard key={postdata._id} post={postdata} />
              ))}
            </div>
            <Link to={'/search'} className='text-lg text-blue-500 hover:underline text-center font-semibold'>
            View All
            </Link>
          </div>
        )}
    </div>


    </div>
  )
}
