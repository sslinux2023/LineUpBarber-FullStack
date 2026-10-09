import { IsNotEmpty, IsDateString, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsInt()
  serviceId?: number;

  @IsOptional()
  @IsString()
  serviceName?: string;
}