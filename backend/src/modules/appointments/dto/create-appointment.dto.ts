import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
import { 
  IsArray, 
  IsDateString, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID 
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'ID do barbeiro',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @ApiProperty({
    description: 'Data e hora do agendamento',
    example: '2025-08-15T14:30:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  scheduledDate: string;

  @ApiProperty({
    description: 'Notas ou instruções especiais',
    example: 'Preferência por barba curta',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Lista de IDs dos serviços escolhidos',
    example: ['550e8400-e29b-41d4-a716-446655440000', '650e8400-e29b-41d4-a716-446655440001'],
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  serviceIds: string[];

  @ApiProperty({
    description: 'Status do agendamento',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
