import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { signoutsuccess } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
// import user from '../../../api/models/post.model'

export default function Dashsidebar() {
  const location = useLocation()
  const [tab, settab] = useState('')
  const dispatch = useDispatch()
  const { currentuser } = useSelector(state => state.user)
  useEffect(() => {
    const urlparams = new URLSearchParams(location.search)
    const tabfromurl = urlparams.get('tab')
    // console.log(tabfromurl)
    if (tabfromurl) {
      settab(tabfromurl)
    }
  }, [location.search])

  const handlesignout = () => {
    try {
      axios.post('/user/signout')
        .then(() => {
          dispatch(signoutsuccess())
          console.log('sign out')
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sidebar className='w-full md:w-56 font-semibold'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-2'>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item className="cursor-pointer font-semibold" active={tab === 'profile'} icon={HiUser} label={currentuser.isadmin ? 'Admin' : 'User'} as='div' labelColor="dark">
              Profile
            </Sidebar.Item>
          </Link>

          {currentuser.isadmin && (

            <>
              <Link to='/dashboard?tab=post'>
                <Sidebar.Item className="font-semibold cursor-pointer" active={tab === 'post'} icon={HiDocumentText} as='div' >
                  Posts
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=user'>
                <Sidebar.Item className="font-semibold cursor-pointer" active={tab === 'user'} icon={HiOutlineUserGroup} as='div' >
                  Users
                </Sidebar.Item>
              </Link>
            </>

          )}

          <Sidebar.Item className='cursor-pointer font-semibold' icon={HiArrowSmRight} onClick={handlesignout} >
            Signout
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
