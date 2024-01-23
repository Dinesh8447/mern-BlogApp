import express from 'express'
import {updateuser,deleteuser,signout} from '../controllers/user.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.put('/update/:userid',verfiyToken,updateuser)
router.delete('/delete/:userid',verfiyToken,deleteuser)
router.post('/signout',signout)




export default router