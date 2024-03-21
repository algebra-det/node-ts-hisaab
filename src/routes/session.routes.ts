import express from 'express'
import validateResource from '../middleware/validateResource'
import {
  loginHandler,
  renewAccessTokenFromRefresh,
  signUpHandler
} from '../controller/session.controller'
import {
  loginSchema,
  refreshTokenSchema,
  signUpSchema
} from '../schema/session.schema'
const router = express.Router()

router.post('/login', validateResource(loginSchema), loginHandler)
router.post('/sign-up', validateResource(signUpSchema), signUpHandler)
router.post(
  '/refresh-token',
  validateResource(refreshTokenSchema),
  renewAccessTokenFromRefresh
)

export default router
