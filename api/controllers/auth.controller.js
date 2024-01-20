import usermodel from '../models/user.model.js'
import bycrypt from 'bcryptjs'



export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hash = bycrypt.hashSync(password,10)
    const user = await usermodel.create({ username, email, password: hash })
    try {
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }

}

