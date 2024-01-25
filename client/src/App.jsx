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
import PrivateRoute from './compoents/PrivateRoute'
import CreatePost from './pages/CreatePost'
import AdminPrivateRoute from './compoents/AdminPrivateRoute'
import Updatepost from './pages/Updatepost'
import PostPage from './pages/PostPage'

axios.defaults.baseURL='http://localhost:4000/api'
axios.defaults.withCredentials=true

function App() {  
  return (
   <Routes>
    <Route path='/' element={<Header/>}> 
    <Route path='/home' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/projects' element={<Projects/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/postpage/:postslug' element={<PostPage/>}/>
    <Route path='/projects' element={<Projects/>}/>
    
    <Route element={<PrivateRoute/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>

    <Route element={<AdminPrivateRoute/>}>
    <Route path='/Createpost' element={<CreatePost/>}/>
    <Route path='/update-post/:id' element={<Updatepost/>}/>
    </Route>

    
    </Route>
   </Routes>
  )
}

export default App
