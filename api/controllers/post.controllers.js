import { errorhandler } from "../utils/error.js"
import postmodel from "../models/post.model.js"

export const createpost = async(req,res,next)=>{

    // console.log(req.user)

    if(!req.user.isadmin){
            return next(errorhandler(403,'you are not allow to create post'))
        }


        if(!req.body.title || !req.body.content){
            return next(errorhandler(400,'please provide all required fields'))
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


export const getpost = async(req,res,next)=>{

    try {
        const startindex = parseInt({userid:req.query.userid})
        const limit = parseInt(req.query.limit) || 9
        const sortdirection = req.query.order === 'asc' ? 1 : -1
        const posts = await postmodel.find({
            ...(req.query.userid && {userid:req.query.userid}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postid && {_id:req.query.postid}),
            ...(req.query.searchterm && {
                $or:[
                    {title:{$regex:req.query.searchterm,$options:'i'}},
                    {content:{$regex:req.query.searchterm,$options:'i'}},
                ],
            }),
    }).sort({updatedAt:sortdirection}).skip(startindex).limit(limit)

        const totalpost = await postmodel.countDocuments()
        const now = new Date()
        const onemonthago = new Date(
            now.getDate(),
            now.getMonth(),
            now.getFullYear(),
        )

        const lastmonthpost = await postmodel.countDocuments({
            createAt:{$gte:onemonthago}
        })

        res.status(200).json({
            posts,
            totalpost,
            lastmonthpost
        })

    } catch (error) {
        next(error)
    }


}


export const deletepost = async(req,res,next)=>{
        if(!req.user.isadmin || req.user.id !== req.params.userid){
            return next(errorhandler(403,'you are not allow to create post'))
        }

        try {
            await postmodel.findByIdAndDelete(req.params.id)
            res.status(200).json('post has been deleted')
        } catch (error) {
            next(error)
        }
}