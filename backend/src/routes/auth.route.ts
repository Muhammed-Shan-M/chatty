import express from 'express'
import { checkAuth, login, logout, signup, updateFullName, updateProfilePicture } from '../controllers/auth.controller.ts'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import upload from '../middleware/multer.ts'

const route = express.Router()

route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', logout)

route.put('/update-profile-picture', protectedRoute,upload.single('image'),updateProfilePicture)
route.put('/update-fullname',protectedRoute, updateFullName)

route.get('/checkAuth',protectedRoute, checkAuth)

export default route