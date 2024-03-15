import * as express from 'express'

type User = {
  id: number
  name: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
