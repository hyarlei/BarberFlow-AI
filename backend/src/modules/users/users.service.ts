import { 
  BadRequestException, 
  ForbiddenException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface FindAllParams {
  page: number;
  limit: number;
  role?: UserRole;
  search?: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, createdById: string): Promise<Omit<User, 'password'>> {
    const { email, password, role, firstName, lastName, phone } = createUserDto;
    
    // Verificar se o email já existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário e perfil em uma transação
    const user = await this.prisma.$transaction(async (prisma) => {
      // Criar usuário
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: role || UserRole.CLIENT,
          createdBy: createdById,
        },
      });

      // Criar perfil
      await prisma.profile.create({
        data: {
          userId: newUser.id,
          firstName,
          lastName,
          phone,
        },
      });

      return newUser;
    });

    // Não retornar a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(params: FindAllParams) {
    const { page, limit, role, search } = params;
    const skip = (page - 1) * limit;

    // Construir a condição de filtro
    const where = {
      ...(role && { role }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' as any } },
          { profile: { 
              OR: [
                { firstName: { contains: search, mode: 'insensitive' as any } },
                { lastName: { contains: search, mode: 'insensitive' as any } },
              ] as any
            } as any
          },
        ],
      }),
    };

    // Contar total de registros
    const total = await this.prisma.user.count({ where });

    // Buscar usuários com paginação
    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, allowAccess: boolean = false): Promise<Omit<User, 'password'>> {
    if (!allowAccess) {
      throw new ForbiddenException('Acesso não autorizado');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Não retornar a senha
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(
    id: string, 
    updateUserDto: UpdateUserDto, 
    updatedById: string, 
    allowAccess: boolean = false
  ): Promise<Omit<User, 'password'>> {
    if (!allowAccess) {
      throw new ForbiddenException('Acesso não autorizado');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    // Preparar dados para atualização
    const userData: any = {
      updatedBy: updatedById,
    };

    // Atualizar campos do usuário se fornecidos
    if (updateUserDto.email !== undefined) userData.email = updateUserDto.email;
    if (updateUserDto.role !== undefined) userData.role = updateUserDto.role;
    if (updateUserDto.isActive !== undefined) userData.isActive = updateUserDto.isActive;
    if (updateUserDto.password) {
      userData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Preparar dados do perfil se fornecidos
    const profileData: any = {};
    if (updateUserDto.firstName !== undefined) profileData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName !== undefined) profileData.lastName = updateUserDto.lastName;
    if (updateUserDto.phone !== undefined) profileData.phone = updateUserDto.phone;
    if (updateUserDto.avatar !== undefined) profileData.avatar = updateUserDto.avatar;
    if (updateUserDto.dateOfBirth !== undefined) profileData.dateOfBirth = updateUserDto.dateOfBirth;
    if (updateUserDto.gender !== undefined) profileData.gender = updateUserDto.gender;
    if (updateUserDto.address !== undefined) profileData.address = updateUserDto.address;
    if (updateUserDto.city !== undefined) profileData.city = updateUserDto.city;
    if (updateUserDto.state !== undefined) profileData.state = updateUserDto.state;
    if (updateUserDto.zipCode !== undefined) profileData.zipCode = updateUserDto.zipCode;

    // Atualizar usuário e perfil em uma transação
    const updatedUser = await this.prisma.$transaction(async (prisma) => {
      // Atualizar usuário
      const updated = await prisma.user.update({
        where: { id },
        data: userData,
      });

      // Atualizar perfil se houver dados
      if (Object.keys(profileData).length > 0) {
        await prisma.profile.update({
          where: { userId: id },
          data: profileData,
        });
      }

      return updated;
    });

    // Não retornar a senha
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getProfile(userId: string, allowAccess: boolean = false) {
    if (!allowAccess) {
      throw new ForbiddenException('Acesso não autorizado');
    }

    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        barberProfile: userId ? {
          select: {
            bio: true,
            experience: true,
            specialties: true,
            portfolio: true,
            rating: true,
            totalReviews: true,
            isAvailable: true,
            workingHours: true,
          },
        } : false,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Perfil para usuário com ID ${userId} não encontrado`);
    }

    return profile;
  }
}
