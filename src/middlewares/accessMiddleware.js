import asyncHandler from 'express-async-handler'

const access = asyncHandler( async (req, res, next) => {
    console.log('access', req.user.subscription)

    if (req.user.subscription) {
        next()
    } else {
        res.status(403)
        throw new Error("Votre abonnement ne permet pas d'accéder à la ressource")
    }
})

export default access