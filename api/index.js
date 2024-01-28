import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userrouter from './routes/user.route.js'
import authrouter from './routes/auth.route.js'
import postrouter from './routes/post.route.js'
import commentrouter from './routes/comment.route.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})



dotenv.config();

app.use(cookieParser())
app.use(bodyParser.json())
// app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))



app.use('/api/user', userrouter)
app.use('/api/auth', authrouter)
app.use('/api/post', postrouter)
app.use('/api/comment', commentrouter)


app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500
    const message = err.message || "Internal server Error"
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})







mongoose.connect(process.env.MONGODB)
    .then(() => console.log('connect'))
    .catch(e => console.log(e))





app.listen(4000, () => {
    console.log('running....4000')
})