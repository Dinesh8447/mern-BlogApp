import axios from 'axios'
import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PostPage() {
const{postslug} =useParams()
const [loading,setloading] = useState(false)
const [error,seterror] = useState(false)
const [post,setpost] = useState(null)

// console.log(post)

useEffect(()=>{

    const fetchpost = async() =>{
        try {
            setloading(true)
            axios.get(`/post/get?slug=${postslug}`)
            .then(({data})=>{
                setpost(data.posts[0])
                setloading(false)
                seterror(false)
            })
            .catch(e=>{
                seterror(e)
            })
        } catch (error) {
            seterror(true)
            setloading(false)
        }
    }

    fetchpost()
    
},[postslug])

if(loading) return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spinner color="purple" size='xl' />
    </div>
)

    return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
      <Button color='gray' pill size='xl' >
        {post && post.category}
      </Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
      <div className='flex p-3 justify-between border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length/1000).toFixed(0)}mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:post && post.content}}>

      </div>
    </main>
  )
}
