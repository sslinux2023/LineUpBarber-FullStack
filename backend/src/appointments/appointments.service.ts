import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: createAppointmentDto,
    });
  }

  findAll() {
    return this.prisma.appointment.findMany();
  }

  findOne(id: number) {
    if (!id || isNaN(Number(id))) {
      throw new Error('Appointment id is required and must be a number');
    }
    return this.prisma.appointment.findUnique({
      where: { id: Number(id) },
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}