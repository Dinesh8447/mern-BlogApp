import express from 'express'
import {updateuser} from '../controllers/user.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.put('/update/:userid',verfiyToken,updateuser)




export default router