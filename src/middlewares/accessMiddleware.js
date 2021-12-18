import asyncHandler from 'express-async-handler'

const access = asyncHandler( async (req, res, next) => {
    if (req.user.subscription) {
        next()
    }

    res.status(403)
    throw new Error("Votre abonnement ne permet pas d'accéder à la ressource")
})

export default access