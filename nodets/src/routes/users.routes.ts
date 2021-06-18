import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../config/upload'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body

  const createUserService = new CreateUserService()

  const user = await createUserService.execute({
    name,
    email,
    password
  })

  delete user.password

  return res.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const avatarService = new UpdateUserAvatarService()

    const user = await avatarService.execute({
      userId: req.user.id,
      avatarFileName: req.file.filename
    })

    delete user.password

    return res.json(user)
  }
)

export default usersRouter
