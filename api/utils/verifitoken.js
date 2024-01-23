//verifi the user before do the curd operation

import jwt from "jsonwebtoken";
import { errorhandler } from '../utils/error.js'

export const verfiyToken = async(req,res,next) =>{
        const token = req.cookies.accesstoken //grap the token from cookies

        if(!token){
            return next(errorhandler(401,'Unauthorized'))
        }

        //verifiy the token
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
            return next(errorhandler(401,'Unauthorized'))
            }
            req.user = user // if verifiy the user , req.user hold the user token
            next() //And then move on next controllers
        })
}

