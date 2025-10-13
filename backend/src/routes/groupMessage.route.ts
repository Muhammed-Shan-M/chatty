import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import { uploadVoiceImage } from '../middleware/multer.ts'
import { getGroupMessages, sendMessage } from '../controllers/groupMessages.controller.ts'

const router = express.Router()

router.post('/:groupId/sendMessage',protectedRoute, uploadVoiceImage, sendMessage)
router.get('/:groupId/getMessages', protectedRoute, getGroupMessages)


export default router