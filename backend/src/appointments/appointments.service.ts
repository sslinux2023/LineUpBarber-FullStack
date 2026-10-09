import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    const { serviceId, ...rest } = createAppointmentDto;
    return this.prisma.appointment.create({
      data: {
        ...rest,
        ...(serviceId ? { serviceId } : {}),
      },
      include: {
        service: { select: { id: true, name: true, nameAr: true, price: true } },
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: {
        service: { select: { id: true, name: true, nameAr: true, price: true } },
      },
      orderBy: { date: 'desc' },
    });
  }

  findOne(id: number) {
    if (!id || isNaN(Number(id))) {
      throw new Error('Appointment id is required and must be a number');
    }
    return this.prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: {
        service: { select: { id: true, name: true, nameAr: true, price: true } },
      },
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}