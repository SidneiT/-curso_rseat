import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const auth = new AuthenticateUserService()

  const { user, jwt } = await auth.execute({ email, password })

  delete user.password

  return res.json({ user, jwt })
})

export default sessionsRouter
