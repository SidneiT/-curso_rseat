import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError'

interface Request {
  date: Date,
  providerId: string
}

class CreateAppointmentService {
  public async execute ({ date, providerId }: Request) : Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('this appointment is already booked')
    }

    const appointment = appointmentRepository.create({
      providerId,
      date: appointmentDate
    })

    await appointmentRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
