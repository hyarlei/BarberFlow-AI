import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAppointmentDto {
  @ApiProperty({
    description: 'ID do barbeiro',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  barberId?: string;

  @ApiProperty({
    description: 'Data e hora do agendamento',
    example: '2025-08-15T14:30:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  scheduledDate?: string;

  @ApiProperty({
    description: 'Notas ou instruções especiais',
    example: 'Preferência por barba curta',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Status do agendamento',
    enum: AppointmentStatus,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
