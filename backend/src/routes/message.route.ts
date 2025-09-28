import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import { fetchAllUserForSideBar, getMessages, sendMessage } from '../controllers/message.controller.ts'
import upload from '../middleware/multer.ts'

const router = express.Router()

router.get('/users',protectedRoute, fetchAllUserForSideBar)
router.get('/:id',protectedRoute, getMessages)

router.post('/send/:id', protectedRoute,upload.single('image'),sendMessage)


export default router