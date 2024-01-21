import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Dashsidebar from '../compoents/Dashsidebar'
import DashProfile from '../compoents/DashProfile'

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
    <div className="min-h-screen flex flex-col md:flex-row font-semibold">
      <div className='md:w-56'>
        {/* sidebar */}
        <Dashsidebar/>
      </div>
      {/* profile.. */}
      {tab === 'profile' && <DashProfile/> }
    </div>
  )
}
