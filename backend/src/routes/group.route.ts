import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.ts'
import { addMembers, createGroup, editGroupInfo, fecthGroupInfo, getuserGroup, getUsers, putAsAdmin, removeFromeAdmin, removeMember } from '../controllers/group.controller.ts'
import { isAdmin } from '../middleware/isAdmin.middleware.ts'
import upload from '../middleware/multer.ts'


const route = express.Router()


route.post('/create-group', protectedRoute,upload.single('avatar'),createGroup)
route.patch('/edit-group-info/:id',protectedRoute,isAdmin,upload.single('avatar'),editGroupInfo)

route.get('/get-group-info/:id',protectedRoute,fecthGroupInfo)
route.get('/get-users-group',protectedRoute,getuserGroup)

route.patch('/put-as-admin/:id',protectedRoute,isAdmin,putAsAdmin)
route.patch('/remove-a-admin/:id',protectedRoute,isAdmin,removeFromeAdmin)

route.patch('/add-members/:id',protectedRoute,isAdmin,addMembers)
route.patch('/remove-a-member/:id',protectedRoute,isAdmin,removeMember)
route.get('/get-users/:id', protectedRoute, getUsers)


export default route