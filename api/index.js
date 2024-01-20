import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userrouter from './routes/user.route.js'
import authrouter from './routes/auth.route.js'


dotenv.config();


const app = express()



app.use(express.json())

app.use('/api/user',userrouter)
app.use('/api/auth',authrouter)








mongoose.connect(process.env.MONGODB)
.then(()=>console.log('connect'))
.catch(e=>console.log(e))

app.listen(4000,()=>{
    console.log('running....4000')
})