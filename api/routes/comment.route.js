import express  from "express";
import {createcomment,getpostcomment} from '../controllers/comment.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'


const router = express.Router()

router.post('/createcomment',verfiyToken,createcomment)
router.get('/getpostcomment/:postid',getpostcomment)



export default router
