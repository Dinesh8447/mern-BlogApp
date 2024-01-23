import usermodel from '../models/user.model.js'
import bycrypt from 'bcryptjs'
import { errorhandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hash = bycrypt.hashSync(password, 10)
    const user = await usermodel.create({ username, email, password: hash })
    try {
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === " " || password === " ") {
        next(errorhandler(400, 'All filelds are required'))
    }

    try {
        const validuser = await usermodel.findOne({ email })
        if (!validuser) {
            return next(errorhandler(404, "user not found"))
        }
        const validpassword = bycrypt.compareSync(password, validuser.password)
        if (!validpassword) {
            // return the next(errorhandler) otherwise it affects the server 
            return next(errorhandler(404, "invalid password"))
        }
        const token = jwt.sign({ id: validuser._id,isadmin:validuser.isadmin }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // if not declear expiresin, it works until web browres open
        const { password: pass, ...rest } = validuser._doc //this boc not show the password when response data 
        res.status(200).cookie('accesstoken', token, { httpOnly: true }).json(rest)
    } catch (error) {
        next(error)
    }

}


export const google = async (req, res, next) => {
    const { name, email, photourl } = req.body

    try {
        const user = await usermodel.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id ,isadmin:user.isadmin}, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc //this boc not show the password when response data 
            res.status(200).cookie('accesstoken', token, { httpOnly: true }).json(rest)

        } else {
            const genratepassword = Math.random().toString(36).slice(-8);
            const hash = bycrypt.hashSync(genratepassword, 10)
            const newuser = new usermodel({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email: email,
                password: hash,
                photourl: photourl
            })
            await newuser.save()
            const token = jwt.sign({ id: user._id,isadmin:user.isadmin }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = validuser._doc
            res.status(200).cookie('accesstoken', token, { httpOnly: true }).json(rest)

        }

    } catch (error) {
        next(error)
    }

}







