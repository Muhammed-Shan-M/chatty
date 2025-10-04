import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import { fetchAllUserForSideBar, getMessages, getUnreadMessages, markAsRead, sendMessage, sendVoiceMessage } from '../controllers/message.controller.ts'
import upload from '../middleware/multer.middleware.ts'

const router = express.Router()

router.get('/users',protectedRoute, fetchAllUserForSideBar)
router.get('/:id',protectedRoute, getMessages)

router.post('/send/:id', protectedRoute,upload.single('image'),sendMessage)
router.post('/send-voice/:id', protectedRoute,upload.single('audio'),sendVoiceMessage)

router.get('/unread-messages/:id', protectedRoute,getUnreadMessages)
router.patch('/mark-as-read',protectedRoute,markAsRead)


export default router