import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Projects from './pages/Projects'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './compoents/Header'
import axios from 'axios'
import Footer from './compoents/Footer'

axios.defaults.baseURL='http://localhost:4000/api'
axios.defaults.withCredentials=true

function App() {  
  return (
   <Routes>
    <Route path='/' element={<Header/>}>    
    <Route path='/home' element={<Home/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/projects' element={<Projects/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    </Route>
   </Routes>
  )
}

export default App
