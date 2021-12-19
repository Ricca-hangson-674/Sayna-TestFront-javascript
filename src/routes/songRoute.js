import express from 'express'
import {
	getSongs,
    getSongById
}from '../controllers/songController.js'
import verifyToken  from '../middlewares/verifyTokenMiddleware.js'
import existToken  from '../middlewares/existTokenMiddleware.js'
import access  from '../middlewares/accessMiddleware.js'

const router = express.Router()


router.get('/', verifyToken, existToken, access, getSongs)
router.get('/:id', verifyToken, existToken, access, getSongById)


export default router