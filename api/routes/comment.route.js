import express  from "express";
import {createcomment} from '../controllers/comment.controller.js'
import { verfiyToken } from '../utils/verifitoken.js'


const router = express.Router()

router.post('/createcomment',verfiyToken,createcomment)



export default router
