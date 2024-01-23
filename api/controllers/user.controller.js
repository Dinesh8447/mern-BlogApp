import { errorhandler } from "../utils/error.js"
import bycrypt from 'bcryptjs'
import usermodel from '../models/user.model.js'

export const updateuser = async (req, res, next) => {

  // res.json(req.user) //this id  (req.user) come from cookie
  if (req.user.id !== req.params.userid) {
    return next(errorhandler(403, 'you are not allowed to update this user'))
  }

  if(req.body.password){
  if (req.body.password.length < 6) {
      return next(errorhandler(400, 'Password must be at least 6 characters'))
    }else{
      req.body.password = bycrypt.hashSync(req.body.password, 10)
    }
  }
    
    
  if(req.body.username){
    if(req.body.username.length < 6 || req.body.username.length > 20 ){
      return next(errorhandler(400, 'username must be between 6 to 20 characters'))    
    }
  }

  if(req.body.username.includes(' ')){
    return next(errorhandler(400, 'Username cannot contain spaces '))
  }

  if(req.body.username !== req.body.username.toLowerCase()){
    return next(errorhandler(400, 'Username must be lowercase'))
  }

  if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
    return next(errorhandler(400, 'Username can only contain numbers and letters'))
  }

  try {
    const userupdate = await usermodel.findByIdAndUpdate(req.params.userid,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        photourl:req.body.photourl
      }
    },{new:true})
    const {password,...rest} = userupdate._doc
    res.status(200).json(rest)   
  } catch (error) {
    next(error)
  }


}

