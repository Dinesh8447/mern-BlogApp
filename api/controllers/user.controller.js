import { errorhandler } from "../utils/error.js"
import bycrypt from 'bcryptjs'
import usermodel from '../models/user.model.js'
// import user from "../models/user.model.js"

export const updateuser = async (req, res, next) => {

  // res.json(req.user) //this id  (req.user) come from cookie


  if (req.user.id !== req.params.userid) {
    return next(errorhandler(403, 'you are not allowed to update this user'))
  }


  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorhandler(400, 'Password must be at least 6 characters'))
    } else {
      req.body.password = bycrypt.hashSync(req.body.password, 10)
    }
  }



  if (req.body.username) {
    if (req.body.username.length < 6 || req.body.username.length > 20) {
      return next(errorhandler(400, 'username must be between 6 to 20 characters'))
    }

    if (req.body.username.includes(' ')) {
      return next(errorhandler(400, 'Username cannot contain spaces '))
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorhandler(400, 'Username must be lowercase'))
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorhandler(400, 'Username can only contain numbers and letters'))
    }
  }

  try {
    const userupdate = await usermodel.findByIdAndUpdate(req.params.userid, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        photourl: req.body.photourl
      }
    }, { new: true })
    const { password, ...rest } = userupdate._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }

}

export const deleteuser = async(req,res,next) =>{
  if (!req.user.isadmin && req.user.id !== req.params.userid) {
    return next(errorhandler(403, 'you are not allowed to update this user'))
  }

  try {
    await usermodel.findByIdAndDelete(req.params.userid)
    res.status(200).json('user has been deleted')
  } catch (error) {
    next(error)   
  }
}

export const signout = async(req,res,next) =>{
  try {
    res.clearCookie('accesstoken').status(200).json('sign out')
  } catch (error) {
    next(error)   
  }
}


export const getusers = async(req,res,next) =>{
  
  if(!req.user.isadmin){
    return next(errorhandler(403,'you are not allow to create post'))
  }
  try {
    const startindex = parseInt({startindex:req.query.startindex}) || 0
    const limit = parseInt(req.query.limit) || 9 
    const sortdirection = req.query.sort === 'asc' ? 1 : -1

    
    const getuser = await usermodel.find()
      .sort({createdAt:sortdirection})
      .skip(startindex)
      .limit(limit)
      
      const userwithoutpass = getuser.map((user)=>{
        const {password,...rest} =user._doc
        return rest
      })

      const totaluser = await usermodel.countDocuments()
      const now = new Date()
      const onemonthago = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
    const lastmonthuser = await usermodel.countDocuments({
      createdAt:{$gte : onemonthago}
    })

    res.status(200).json({
      users:userwithoutpass,
      totaluser,
      lastmonthuser
    })
  } catch (error) {
    next(error)   
  }
}



export const getusersforcomments = async(req,res,next) =>{



try {
    const user = await usermodel.findById(req.params.userid)

    if(!user){
    return next(errorhandler(404,'user not found'))
    }

    const {password,...rest} = user._doc
    res.status(200).json(rest)
  
} catch (error) {
  next(error)
}

}