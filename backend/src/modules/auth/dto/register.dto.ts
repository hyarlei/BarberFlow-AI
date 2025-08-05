import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'E-mail deve ter um formato válido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
    minLength: 6,
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
  })
  @IsString({ message: 'Primeiro nome deve ser uma string' })
  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  firstName: string;

  @ApiProperty({
    description: 'Último nome do usuário',
    example: 'Silva',
  })
  @IsString({ message: 'Último nome deve ser uma string' })
  @IsNotEmpty({ message: 'Último nome é obrigatório' })
  lastName: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '(11) 99999-9999',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  phone?: string;

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    enum: UserRole,
    example: UserRole.CLIENT,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Papel deve ser CLIENT, BARBER ou ADMIN' })
  role?: UserRole;
}
