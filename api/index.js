import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// const dotenv = require('dotenv')

dotenv.config();


const app = express()


mongoose.connect(process.env.MONGODB)
.then(()=>console.log('connect'))
.catch(e=>console.log(e))

app.listen(4000,()=>{
    console.log('running....4000')
})