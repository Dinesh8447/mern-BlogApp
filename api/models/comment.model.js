import mongoose from "mongoose";

const commentschema = new mongoose.Schema({
    content:String,
    postid:String,
    userid:String,
    likes:{
        type:Array,
        default:[]
    },
    numberoflikes:{
        type:Number,
        default:0
    }

},{timestamps:true})

const comment = mongoose.model('commentmodel',commentschema)

export default comment;