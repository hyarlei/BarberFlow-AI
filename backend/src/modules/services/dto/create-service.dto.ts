import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte de Cabelo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Corte de cabelo masculino com máquina e tesoura',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Duração do serviço em minutos',
    example: 30,
  })
  @IsNumber()
  @IsPositive()
  @Min(5)
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Preço base do serviço',
    example: 35.5,
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty({
    description: 'Categoria do serviço',
    example: 'Corte',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'URL da imagem do serviço',
    example: 'https://example.com/images/haircut.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Indica se o serviço está ativo',
    example: true,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
