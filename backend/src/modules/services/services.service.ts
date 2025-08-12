import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

interface FindAllParams {
  page: number;
  limit: number;
  category?: string;
  isActive?: boolean;
}

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto, createdBy: string): Promise<Service> {
    try {
      return await this.prisma.service.create({
        data: {
          ...createServiceDto,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao criar serviço: ' + error.message);
    }
  }

  async findAll(params: FindAllParams) {
    const { page, limit, category, isActive } = params;
    const skip = (page - 1) * limit;
    
    // Construir a condição de filtro
    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    // Contar total de registros
    const total = await this.prisma.service.count({ where });
    
    // Buscar serviços com paginação
    const services = await this.prisma.service.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    });

    // Retornar com metadados de paginação
    return {
      data: services,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto, updatedBy: string): Promise<Service> {
    // Verificar se o serviço existe
    await this.findOne(id);

    try {
      return await this.prisma.service.update({
        where: { id },
        data: {
          ...updateServiceDto,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar serviço: ' + error.message);
    }
  }

  async remove(id: string): Promise<Service> {
    // Verificar se o serviço existe
    await this.findOne(id);

    // Verificar se o serviço está vinculado a agendamentos
    const hasAppointments = await this.prisma.appointment.count({
      where: { serviceId: id },
    });

    if (hasAppointments > 0) {
      // Marcar como inativo ao invés de excluir
      return await this.prisma.service.update({
        where: { id },
        data: { isActive: false },
      });
    }

    // Se não houver agendamentos, pode excluir
    return await this.prisma.service.delete({
      where: { id },
    });
  }

  async getBarberServices(barberId: string) {
    // Verificar se o barbeiro existe
    const barber = await this.prisma.barberProfile.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new NotFoundException(`Barbeiro com ID ${barberId} não encontrado`);
    }

    // Buscar serviços do barbeiro
    const barberServices = await this.prisma.barberService.findMany({
      where: { barberId },
      include: {
        service: true,
      },
      orderBy: {
        service: {
          name: 'asc',
        },
      },
    });

    return barberServices.map(bs => ({
      ...bs.service,
      customPrice: bs.customPrice,
      isAvailable: bs.isAvailable,
      estimatedTime: bs.estimatedTime || bs.service.duration,
    }));
  }

  async addBarberService(barberId: string, serviceId: string, customPrice?: number) {
    // Verificar se o barbeiro existe
    const barber = await this.prisma.barberProfile.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new NotFoundException(`Barbeiro com ID ${barberId} não encontrado`);
    }

    // Verificar se o serviço existe
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException(`Serviço com ID ${serviceId} não encontrado`);
    }

    // Verificar se o barbeiro já oferece este serviço
    const existingBarberService = await this.prisma.barberService.findUnique({
      where: {
        barberId_serviceId: {
          barberId,
          serviceId,
        },
      },
    });

    if (existingBarberService) {
      // Se já existir, atualiza apenas o preço personalizado
      return await this.prisma.barberService.update({
        where: {
          barberId_serviceId: {
            barberId,
            serviceId,
          },
        },
        data: {
          customPrice,
          isAvailable: true,
        },
        include: {
          service: true,
        },
      });
    }

    // Adicionar serviço ao barbeiro
    return await this.prisma.barberService.create({
      data: {
        barberId,
        serviceId,
        customPrice,
        isAvailable: true,
      },
      include: {
        service: true,
      },
    });
  }

  async removeBarberService(barberId: string, serviceId: string) {
    // Verificar se o relacionamento existe
    const barberService = await this.prisma.barberService.findUnique({
      where: {
        barberId_serviceId: {
          barberId,
          serviceId,
        },
      },
    });

    if (!barberService) {
      throw new NotFoundException(`Serviço ${serviceId} não encontrado para o barbeiro ${barberId}`);
    }

    // Verificar se há agendamentos usando este serviço
    const appointments = await this.prisma.appointment.count({
      where: {
        barberId,
        serviceId,
      },
    });

    if (appointments > 0) {
      // Marcar como indisponível em vez de excluir
      return await this.prisma.barberService.update({
        where: {
          barberId_serviceId: {
            barberId,
            serviceId,
          },
        },
        data: {
          isAvailable: false,
        },
      });
    }

    // Se não houver agendamentos, pode excluir
    return await this.prisma.barberService.delete({
      where: {
        barberId_serviceId: {
          barberId,
          serviceId,
        },
      },
    });
  }
}
