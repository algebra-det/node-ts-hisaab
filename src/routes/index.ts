import { Express, Request, Response } from 'express'
import {
  createUserHandler,
  getAllNonAdminUsersHandler
} from '../controller/user.controller'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/user.schema'
import { loginHandler, signUpHandler, testingHandler } from '../controller/session.controller'
import { loginSchema, signUpSchema } from '../schema/session.schema'

const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Home route working' })
  })

  app.get('/test', testingHandler)

  app.post('/login', validateResource(loginSchema), loginHandler)
  app.post('/sign-up', validateResource(signUpSchema), signUpHandler)
  app.get('/user', getAllNonAdminUsersHandler)
  app.post(
    '/user/create',
    validateResource(createUserSchema),
    createUserHandler
  )
}

export default routes
