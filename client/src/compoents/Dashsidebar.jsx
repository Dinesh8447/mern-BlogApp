import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { signoutsuccess } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'

export default function Dashsidebar() {
    const location = useLocation()
    const [tab,settab] = useState('')
    const dispatch = useDispatch()
    
    useEffect(()=>{
      const urlparams = new URLSearchParams(location.search)
      const tabfromurl = urlparams.get('tab')
      // console.log(tabfromurl)
      if(tabfromurl){
        settab(tabfromurl)
      }
    },[location.search])

    const handlesignout = () =>{
        try {
          axios.post('/user/signout')
          .then(()=>{
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
                <Sidebar.ItemGroup>
                    <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item className="font-semibold" active={tab === 'profile'} icon={HiUser} label='User' as='div' labelColor="dark">
                        Profile
                    </Sidebar.Item>
                    </Link>

                    <Sidebar.Item  className='cursor-pointer font-semibold' icon={HiArrowSmRight} onClick={handlesignout} >
                        Signout
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
