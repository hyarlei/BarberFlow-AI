import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID do agendamento associado ao pagamento' })
  @IsUUID()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({ description: 'Valor do pagamento', example: 50.00 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ 
    description: 'Método de pagamento',
    enum: PaymentMethod,
    example: PaymentMethod.PIX
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @ApiProperty({ description: 'ID da transação no gateway de pagamento', required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({ 
    description: 'Status do pagamento', 
    enum: PaymentStatus, 
    default: PaymentStatus.PENDING,
    example: PaymentStatus.PENDING 
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({ description: 'Informações adicionais', required: false, type: 'object' })
  @IsOptional()
  metadata?: Record<string, any>;
}
