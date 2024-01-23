import express from 'express'
import {createpost} from '../controllers/post.controllers.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.post('/createpost',verfiyToken,createpost)
// router.put('/update/:userid',verfiyToken,updateuser)
// router.delete('/delete/:userid',verfiyToken,deleteuser)




export default router