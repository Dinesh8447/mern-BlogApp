import { errorhandler } from "../utils/error.js"
import postmodel from "../models/post.model.js"

export const createpost = async(req,res,next)=>{

    // console.log(req.user)

    if(!req.user.isadmin){
            return errorhandler(403,'you are not allow to create post')
        }


        if(!req.body.title || !req.body.content){
            return errorhandler(400,'please provide all required fields')
        }

        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g,'-')
        const newpost = new postmodel({
            ...req.body,
            slug,
            userid:req.user.id
        })

        try {
            const savepost = await newpost.save()
            res.status(200).json(savepost)

        } catch (error) {
            next(error)
        }
}