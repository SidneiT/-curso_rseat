import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentRepository.find()

  return res.json(appointments)
})

appointmentsRouter.post('/', async (req, res) => {
  const { providerId, date } = req.body

  const parsedDate = parseISO(date)

  const appointmentService = new CreateAppointmentService()

  const appointment = await appointmentService.execute({
    providerId,
    date: parsedDate
  })

  return res.json(appointment)
})

export default appointmentsRouter
