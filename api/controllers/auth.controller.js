import usermodel from '../models/user.model.js'
import bycryptjs from 'bcryptjs'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hash = bycryptjs.hashSync(password, 10)

    const user = new usermodel({ username, email, password: hash })

    try {
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }

}