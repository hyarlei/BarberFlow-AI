import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({ 
    description: 'Status do pagamento', 
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED 
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({ description: 'ID da transação no gateway de pagamento', required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({ description: 'Informações adicionais', required: false, type: 'object' })
  @IsOptional()
  metadata?: Record<string, any>;
}
