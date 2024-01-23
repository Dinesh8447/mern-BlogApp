import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    photourl:{
        type:String,
        default:"https://qph.cf2.quoracdn.net/main-qimg-ba9341fd5e99e413f706915513491700-lq"
    },
    isadmin:{
        type:Boolean,
        default:false
    }

},{timeseries:true})

const user = mongoose.model('usermodel',userschema)

export default user;