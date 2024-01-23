import express from 'express'
import {updateuser,deleteuser} from '../controllers/user.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.put('/update/:userid',verfiyToken,updateuser)
router.delete('/delete/:userid',verfiyToken,deleteuser)




export default router