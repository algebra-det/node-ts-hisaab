import { Express, Request, Response } from 'express'
import {
  createUserHandler,
  getAllNonAdminUsersHandler
} from '../controller/user.controller'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/user.schema'
import {
  getUserData,
  loginHandler,
  renewAccessTokenFromRefresh,
  signUpHandler
} from '../controller/session.controller'
import {
  loginSchema,
  refreshTokenSchema,
  signUpSchema
} from '../schema/session.schema'
import deserializeUser from '../middleware/deserializeUser'
import requireUser from '../middleware/requireUser'

const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Home route working' })
  })

  app.post('/login', validateResource(loginSchema), loginHandler)
  app.post('/sign-up', validateResource(signUpSchema), signUpHandler)
  app.post(
    '/refresh-token',
    validateResource(refreshTokenSchema),
    renewAccessTokenFromRefresh
  )

  app.use(deserializeUser)

  app.get('/my-data', requireUser, getUserData)
  app.get('/user', getAllNonAdminUsersHandler)
  app.post(
    '/user/create',
    validateResource(createUserSchema),
    createUserHandler
  )
}

export default routes
