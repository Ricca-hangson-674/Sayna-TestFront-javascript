import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler( async (req, res, next) => {
    let token = null

    console.log(req.headers.authorization)

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            req.user = await User.findById(decoded.id)

            next()
        } catch (error) {
            console.error(error)
            
            res.status(401)
            throw new Error("Votre token n'est pas correct")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Votre token n'est pas correct")
    }


})

export default protect