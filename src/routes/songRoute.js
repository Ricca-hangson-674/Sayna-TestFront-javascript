import express from 'express'
import {
	getSongs,
    getSongById
}from '../controllers/songController.js'
import verifyToken  from '../middleware/verifyTokenMiddleware.js'
import existToken  from '../middleware/existTokenMiddleware.js'
import access  from '../middleware/accessMiddleware.js'

const router = express.Router()


router.get('/', verifyToken, existToken, access, getSongs)
router.get('/:id', verifyToken, existToken, access, getSongById)


export default router