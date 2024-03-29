import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Dashsidebar from '../compoents/Dashsidebar'
import DashProfile from '../compoents/DashProfile'
import DashPost from '../compoents/DashPost'
import Dashuser from '../compoents/Dashuser'
import DashComments from '../compoents/DashComments'
import DashboarAllActivitys from '../compoents/DashboarAllActivitys'

export default function Dashboard() {
const location = useLocation()
const [tab,settab] = useState('')

useEffect(()=>{
  const urlparams = new URLSearchParams(location.search)

  const tabfromurl = urlparams.get('tab')
  // console.log(tabfromurl)
  if(tabfromurl){
    settab(tabfromurl)
  }
},[location.search])
  return (
    <div className="min-h-screen flex  md:flex-row font-semibold">
      <div className='md:w-56'>
        {/* sidebar */}
        <Dashsidebar/>
      </div>
      {/* profile.. */}
      {tab === 'profile' && <DashProfile/> }
      {tab === 'post' && <DashPost/> }
      {tab === 'user' && <Dashuser/> }
      {tab === 'comments' && <DashComments/> }
      {tab === 'dashboardactivity' && <DashboarAllActivitys/> }
    </div>
  )
}
