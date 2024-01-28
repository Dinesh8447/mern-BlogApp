import React, { useEffect, useState } from 'react'
import { Button, Select, TextInput } from 'flowbite-react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PostCard from '../pages/PostCard'

export default function Search() {
  const [sidebardate, setsidebardate] = useState({
    searchterms: '',
    sort: 'desc',
    category: 'uncategory',
  })

  console.log(sidebardate)

  const [getpost, setgetpost] = useState([])
  const [loading, setloading] = useState(false)
  const [showmodel, setshowmodel] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const urlparms = new URLSearchParams(location.search)
    const searchtermfromurl = urlparms.get('searchterms')
    const sort = urlparms.get('sort')
    const category = urlparms.get('category')

    if (searchtermfromurl || sort || category) {
      setsidebardate({
        ...sidebardate,
        searchterms: searchtermfromurl,
        sort: sort,
        category: category
      })
    }

    const fetchpost = async () => {
      setloading(true)
      const setquery = urlparms.toString()
      // console.log(setquery)
      axios.get(`/post/get?${setquery}`)
        .then(({ data }) => {
          setloading(false)
          setgetpost(data.posts)
          if (data.posts.length === 9) {
            setshowmodel(true)
          } else {
            setshowmodel(false)
          }
        })
        .catch(e => console.log(e))
    }

    fetchpost()



  }, [location.search])

  const handlechange = (e) => {
    if (e.target.id === 'searchterms') {
      setsidebardate({ ...sidebardate, searchterms: e.target.value })
    }

    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc'
      setsidebardate({ ...sidebardate, sort: order })
    }

    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategory'
      setsidebardate({ ...sidebardate, category: category })
    }


  }


  const handlesubmit = (e) => {
    e.preventDefault()
    const urlparms = new URLSearchParams(location.search)
    urlparms.set('searchterms', sidebardate.searchterms)
    urlparms.set('sort', sidebardate.sort)
    urlparms.set('category', sidebardate.category)
    const searchquery = urlparms.toString()
    navigate(`/search?${searchquery}`)
  }


  const handleshowmore = async () => {
    const startindex = getpost.length;
    const urlparms = new URLSearchParams(location.search)
    urlparms.set('startindex',startindex)
    const searchquery = urlparms.toString()
    try {
      await axios.get(`/post/get?startindex=${searchquery}`)
        .then(({ data }) => {
          if (data) {
            console.log(data)
            setgetpost((prev) => [...prev, ...data.posts])
          }
          if (data.user.length === 9) {
            setshowmodel(true)
          }else{
            setshowmodel(false)
          }
        })

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form action="flex flex-col gap-8" onSubmit={handlesubmit}>
          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>Search</label>
            <TextInput placeholder='search..' value={sidebardate.searchterms} onChange={handlechange} id='searchterms' type='text' />

          </div>

          <div className=" flex items-center gap-2 mt-4">
            <label className='whitespace-nowrap font-semibold'>Sort</label>
            <Select onChange={handlechange} value={sidebardate.sort} id='sort'>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className=" flex items-center gap-2 mt-4">
            <label className='whitespace-nowrap font-semibold'>Category</label>
            <Select onChange={handlechange} value={sidebardate.category} id='category'>
              <option value="uncategory">Uncategorized</option>
              <option value="java">Java</option>
              <option value="reactjs">Reactjs</option>
              <option value="js">JavaScript</option>
              <option value="Go">Go</option>
            </Select>
          </div>

          <Button type='submit' gradientDuoTone='purpleToPink' className='mt-5' outline>
            Apply Filter
          </Button>

        </form>
      </div>
      <div className="w-full">
          <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
          <div className="p-7 flex flex-wrap gap-4">
          {
            !loading && getpost.length === 0 && (
              <p className='text-xl text-gray-500'>No posts found.</p>
            )
          }



          {loading && (
            <p className='text-xl text-gray-500'>
              Loading...
            </p>
          )}

          {
            !loading && getpost && getpost.map((post)=>(
              <PostCard key={post._id} post={post}/>
            ))
          }

        {
          showmodel && <Button onClick={handleshowmore}  gradientDuoTone='purpleToPink' className='mt-5' outline>Show more</Button>
        }



          </div>
      </div>
    </div>
  )
}
