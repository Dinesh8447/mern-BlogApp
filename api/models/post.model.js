import mongoose from "mongoose";

const postschema = new mongoose.Schema({
    userid:String,
    content:String,
    title:{
        type:String,
        require:true,
        unique:true,
    },
    image:{
        type:String,
        default:"https://qph.cf2.quoracdn.net/main-qimg-ba9341fd5e99e413f706915513491700-lq"
    },
    category:{
        type:String,
        default:"uncategory"
    },
    slug:{
        type:String,
        require:true,
        unique:true,
    }

},{timestamps:true})

const user = mongoose.model('postmodel',postschema)

export default user;