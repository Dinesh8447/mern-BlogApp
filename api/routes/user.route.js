import express from 'express'
import {updateuser,deleteuser,signout,getusers,getusersforcomments} from '../controllers/user.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.put('/update/:userid',verfiyToken,updateuser)
router.delete('/delete/:userid',verfiyToken,deleteuser)
router.post('/signout',signout)
router.get('/getusers',verfiyToken,getusers)
router.get('/:userid',getusersforcomments)






export default router