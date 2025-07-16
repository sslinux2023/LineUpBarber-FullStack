// filepath: c:\Users\saoudi\Desktop\LineUpBarber\backend\src\appointments\dto\create-appointment.dto.ts
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  date: string;
}