import express from 'express'
import {
	login,
	register,
	deleteUser,
	updateUser,
	logout
}from '../controllers/userController.js'
import {
	updateCard,
    subscription
}from '../controllers/cardController.js'
import apiLimiter  from '../middleware/rateLimitMiddleware.js'
import verifyToken  from '../middleware/verifyTokenMiddleware.js'
import existToken  from '../middleware/existTokenMiddleware.js'

import { 
    schemaLoginRequest, 
    schemaRegisterRequest,
    schemaUserUpdateRequest,
    schemaCardRequest } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/login', schemaLoginRequest, apiLimiter, login)
router.post('/register', schemaRegisterRequest, register)


router.put('/user', verifyToken, existToken, schemaUserUpdateRequest, updateUser)
router.delete('/user/off', verifyToken, existToken, logout)
router.delete('/user', verifyToken, existToken, deleteUser)


router.put('/user/cart', verifyToken, existToken, schemaCardRequest, updateCard)
router.put('/subscription', verifyToken, existToken, subscription)


export default router