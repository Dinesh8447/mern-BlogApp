import express from 'express'
import {createpost,getpost} from '../controllers/post.controllers.js'
import { verfiyToken } from '../utils/verifitoken.js'

const router = express.Router()

router.post('/createpost',verfiyToken,createpost)
router.get('/get',getpost)
// router.delete('/delete/:userid',verfiyToken,deleteuser)




export default router