import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import { uploadVoiceImage } from '../middleware/multer.ts'
import { getGroupMessages, markAsReadUnreadCounts, sendMessage ,findUnreadMessages} from '../controllers/groupMessages.controller.ts'

const router = express.Router()

router.post('/:groupId/sendMessage',protectedRoute, uploadVoiceImage, sendMessage)
router.get('/:groupId/getMessages', protectedRoute, getGroupMessages)


router.get('/:userId/get-unread-messages',protectedRoute, findUnreadMessages)
router.patch('/:groupId/markAsRead-ureadMessages',protectedRoute, markAsReadUnreadCounts)


export default router