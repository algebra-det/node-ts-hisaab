import express from 'express'
import requireUser from '../middleware/requireUser'
import {
  createUserHandler,
  getAllNonAdminUsersHandler
} from '../controller/user.controller'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/user.schema'
import { getUserData } from '../controller/session.controller'
const router = express.Router()

router.get('/users', getAllNonAdminUsersHandler)
router.get('/my-data', requireUser, getUserData)
router.post('/create', validateResource(createUserSchema), createUserHandler)

export default router
