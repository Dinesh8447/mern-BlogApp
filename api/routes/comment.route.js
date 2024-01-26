import express  from "express";
import {createcomment,getpostcomment,likecomment,editcomment,deletecomment} from '../controllers/comment.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'


const router = express.Router()

router.post('/createcomment',verfiyToken,createcomment)
router.get('/getpostcomment/:postid',getpostcomment)
router.put('/likecomment/:commentid',verfiyToken,likecomment)
router.put('/editcomment/:commentid',verfiyToken,editcomment)
router.delete('/deletecomment/:commentid',verfiyToken,deletecomment)



export default router
