import { Express, Request, Response } from 'express'
import deserializeUser from '../middleware/deserializeUser'

import sessionRoutes from './session.routes'
import userRoutes from './user.routes'

const routes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Home route working' })
  })

  app.use('/auth', sessionRoutes)

  app.use(deserializeUser)
  app.use('/admin', userRoutes)
}

export default routes
