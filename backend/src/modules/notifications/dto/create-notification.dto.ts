import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'ID do usuário que receberá a notificação' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Título da notificação' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Conteúdo da notificação' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ 
    description: 'Tipo de notificação', 
    enum: NotificationType,
    example: NotificationType.EMAIL 
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @ApiProperty({ description: 'Link opcional para redirecionar quando clicar na notificação' })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiProperty({ description: 'Dados adicionais da notificação', required: false })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
