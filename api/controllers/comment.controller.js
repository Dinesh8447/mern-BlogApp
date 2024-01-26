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



export const likecomment = async(req,res,next) =>{
    try {
        const commentlike = await commentdb.findByIdAndUpdate(req.params.commentid)
        if(!commentlike){
            return next(errorhandler(403,'cannot not found'))
        }

        const userindex = commentlike.likes.indexOf(req.user.id)

        if(userindex === -1){
            commentlike.numberoflikes += 1;
            commentlike.likes.push(req.user.id)
        }else{
            commentlike.numberoflikes -= 1;
            commentlike.likes.splice(userindex,1)
        }
        await commentlike.save()

        res.status(200).json(commentlike)

    } catch (error) {
        next(error)
    }
}


