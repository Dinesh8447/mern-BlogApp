import commentdb from '../models/comment.model.js'


export const createcomment = async(req,res,next) =>{
    try {
        const {content,postid,userid} = req.body
        if(userid !== req.user.id){
            return next(errorhandler(403,'you are not allow to create this comment'))
        }
        const newcomment = new commentdb({
            content,
            userid,
            postid
        })
        await newcomment.save()
        res.status(200).json(newcomment)
    } catch (error) {
        next(error)
    }
}

export const getpostcomment = async(req,res,next) =>{
    // console.log(req.params)
    try {
        const comments = await commentdb.find({userid:req.params.postid})
        .sort({createdAt:-1,})
        res.status(200).json(comments)

    } catch (error) {
        next(error)
    }
}