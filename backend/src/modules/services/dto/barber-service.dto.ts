import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class BarberServiceDto {
  @ApiProperty({
    description: 'ID do serviço',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description: 'Preço personalizado para o barbeiro',
    example: 40.0,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  customPrice?: number;
}
