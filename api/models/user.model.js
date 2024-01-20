import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,

},{timeseries:true})

const user = mongoose.model('usermodel',userschema)

export default user;