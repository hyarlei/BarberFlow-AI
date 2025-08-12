import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Appointment, AppointmentStatus } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

interface FindAllParams {
  page: number;
  limit: number;
  status?: string;
  barberId?: string;
  startDate?: Date;
  endDate?: Date;
  userId?: string;
}

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string): Promise<Appointment> {
    const { barberId, scheduledDate, serviceIds, notes, status } = createAppointmentDto;

    // Verificar se o barbeiro existe
    const barber = await this.prisma.barberProfile.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new NotFoundException(`Barbeiro com ID ${barberId} não encontrado`);
    }

    // Verificar se os serviços existem
    const services = await this.prisma.service.findMany({
      where: {
        id: { in: serviceIds },
        isActive: true,
      },
    });

    if (services.length !== serviceIds.length) {
      throw new BadRequestException('Um ou mais serviços selecionados não estão disponíveis');
    }

    // Verificar se o barbeiro oferece esses serviços
    const barberServices = await this.prisma.barberService.findMany({
      where: {
        barberId,
        serviceId: { in: serviceIds },
        isAvailable: true,
      },
    });

    if (barberServices.length !== serviceIds.length) {
      throw new BadRequestException('Um ou mais serviços não são oferecidos por este barbeiro');
    }

    // Calcular duração total dos serviços
    const totalDuration = services.reduce(
      (total, service) => total + service.duration,
      0
    );

    // Verificar disponibilidade do horário
    const scheduledFor = new Date(scheduledDate);
    
    // Verificar se já existe agendamento neste horário
    const conflictingAppointments = await this.prisma.appointment.findMany({
      where: {
        barberId,
        status: {
          in: [
            AppointmentStatus.SCHEDULED,
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.IN_PROGRESS,
          ],
        },
        scheduledFor: {
          // Verificar se já existe agendamento entre o horário solicitado e o término
          gte: scheduledFor,
          lt: new Date(scheduledFor.getTime() + totalDuration * 60000),
        },
      },
    });

    if (conflictingAppointments.length > 0) {
      throw new BadRequestException('Horário não disponível');
    }

    // Calcular preço total
    const totalPrice = services.reduce(
      (total, service) => {
        // Verificar se o barbeiro tem preço customizado para esse serviço
        const barberService = barberServices.find(bs => bs.serviceId === service.id);
        return total + (barberService?.customPrice || service.basePrice);
      }, 
      0
    );

    // Usar o primeiro serviço como principal (poderia ser atualizado para suportar múltiplos)
    const mainServiceId = serviceIds[0];

    // Criar o agendamento
    const appointment = await this.prisma.appointment.create({
      data: {
        barberId,
        serviceId: mainServiceId,
        scheduledFor,
        duration: totalDuration,
        totalPrice,
        notes,
        status: status || AppointmentStatus.SCHEDULED,
        users: {
          create: {
            userId,
          },
        },
      },
      include: {
        barber: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          }
        },
        service: true,
        users: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return appointment;
  }

  async findAll(params: FindAllParams) {
    const { page, limit, status, barberId, startDate, endDate, userId } = params;
    const skip = (page - 1) * limit;

    // Construir a condição de filtro
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (barberId) {
      where.barberId = barberId;
    }

    // Filtrar por intervalo de datas
    if (startDate || endDate) {
      where.scheduledFor = {};
      if (startDate) where.scheduledFor.gte = startDate;
      if (endDate) where.scheduledFor.lte = endDate;
    }

    // Se for um usuário normal (não admin), filtrar por seus agendamentos
    if (userId) {
      where.users = {
        some: {
          userId,
        },
      };
    }

    // Contar total de registros
    const total = await this.prisma.appointment.count({ where });

    // Buscar agendamentos com paginação
    const appointments = await this.prisma.appointment.findMany({
      where,
      include: {
        barber: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        service: true,
        users: {
          include: {
            user: {
              select: {
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: { scheduledFor: 'desc' },
    });

    return {
      data: appointments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId?: string): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        barber: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
                phone: true,
              },
            },
          },
        },
        service: true,
        users: {
          include: {
            user: {
              select: {
                email: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado`);
    }

    // Verificar permissão para acessar o agendamento
    if (userId) {
      const isUserInAppointment = appointment.users.some((u) => u.userId === userId);
      const isBarber = userId === appointment.barberId;

      if (!isUserInAppointment && !isBarber) {
        throw new ForbiddenException('Acesso não autorizado a este agendamento');
      }
    }

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    userId: string,
    isAdmin: boolean
  ): Promise<Appointment> {
    const appointment = await this.findOne(id, isAdmin ? undefined : userId);

    // Verificar se o agendamento pode ser atualizado
    if (
      [AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW].includes(
        appointment.status as any
      )
    ) {
      throw new BadRequestException(`Agendamento com status ${appointment.status} não pode ser atualizado`);
    }

    // Preparar dados para atualização
    const data: any = {};

    if (updateAppointmentDto.barberId) data.barberId = updateAppointmentDto.barberId;
    if (updateAppointmentDto.scheduledDate) data.scheduledFor = new Date(updateAppointmentDto.scheduledDate);
    if (updateAppointmentDto.notes) data.notes = updateAppointmentDto.notes;
    if (updateAppointmentDto.status) data.status = updateAppointmentDto.status;

    // Atualizar campos específicos de acordo com o status
    if (data.status === AppointmentStatus.CANCELLED) {
      data.cancelledAt = new Date();
    } else if (data.status === AppointmentStatus.COMPLETED) {
      data.completedAt = new Date();
    }

    // Atualizar agendamento
    return this.prisma.appointment.update({
      where: { id },
      data,
      include: {
        barber: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          }
        },
        service: true,
        users: {
          include: {
            user: {
              select: {
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async cancel(id: string, userId: string, isAdmin: boolean): Promise<Appointment> {
    const appointment = await this.findOne(id, isAdmin ? undefined : userId);

    // Verificar se o agendamento já foi cancelado ou concluído
    if (
      [AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED, AppointmentStatus.NO_SHOW].includes(
        appointment.status as any
      )
    ) {
      throw new BadRequestException(`Agendamento com status ${appointment.status} não pode ser cancelado`);
    }

    // Cancelar agendamento
    return this.prisma.appointment.update({
      where: { id },
      data: {
        status: AppointmentStatus.CANCELLED,
        cancelledAt: new Date(),
        cancelReason: 'Cancelado pelo usuário',
      },
      include: {
        barber: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          }
        },
        service: true,
        users: true
      },
    });
  }

  async checkBarberAvailability(barberId: string, date: Date): Promise<any> {
    // Verificar se o barbeiro existe
    const barber = await this.prisma.barberProfile.findUnique({
      where: { id: barberId },
    });

    if (!barber) {
      throw new NotFoundException(`Barbeiro com ID ${barberId} não encontrado`);
    }

    // Obter horário de trabalho do barbeiro
    const workingHours = barber.workingHours as any || {
      // Horário padrão se não tiver configuração
      start: '09:00',
      end: '18:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      daysOff: [0, 6], // domingo e sábado
    };

    // Verificar se é um dia de folga
    const dayOfWeek = date.getDay();
    if (workingHours.daysOff?.includes(dayOfWeek)) {
      return {
        barberId,
        date: date.toISOString().split('T')[0],
        available: false,
        reason: 'Barbeiro não trabalha neste dia',
        availableSlots: [],
      };
    }

    // Obter agendamentos para o dia selecionado
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        barberId,
        scheduledFor: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          in: [
            AppointmentStatus.SCHEDULED,
            AppointmentStatus.CONFIRMED,
            AppointmentStatus.IN_PROGRESS,
          ],
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
    });

    // Calcular slots disponíveis
    const slots = this.generateTimeSlots(date, workingHours, appointments);

    return {
      barberId,
      date: date.toISOString().split('T')[0],
      available: slots.length > 0,
      availableSlots: slots,
    };
  }

  private generateTimeSlots(date: Date, workingHours: any, appointments: Appointment[]): string[] {
    // Hora de início e fim em minutos desde o início do dia
    const [startHour, startMin] = workingHours.start.split(':').map(Number);
    const [endHour, endMin] = workingHours.end.split(':').map(Number);
    const [breakStartHour, breakStartMin] = workingHours.breakStart?.split(':').map(Number) || [0, 0];
    const [breakEndHour, breakEndMin] = workingHours.breakEnd?.split(':').map(Number) || [0, 0];

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const breakStartMinutes = breakStartHour * 60 + breakStartMin;
    const breakEndMinutes = breakEndHour * 60 + breakEndMin;

    // Slots de 30 minutos
    const slotDuration = 30;
    const slots: string[] = [];

    // Gerar todos os slots possíveis
    for (let time = startMinutes; time < endMinutes; time += slotDuration) {
      // Pular slots durante o intervalo
      if (
        workingHours.breakStart &&
        time >= breakStartMinutes &&
        time < breakEndMinutes
      ) {
        continue;
      }

      // Formatar o horário
      const hour = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
      const minute = (time % 60).toString().padStart(2, '0');
      const timeString = `${hour}:${minute}`;

      // Verificar se o slot está disponível
      const slotDate = new Date(date);
      slotDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

      // Verificar se o slot não conflita com agendamentos existentes
      const isAvailable = appointments.every((appointment) => {
        const appointmentStart = new Date(appointment.scheduledFor);
        const appointmentEnd = new Date(
          appointmentStart.getTime() + appointment.duration * 60000
        );

        // O slot não pode começar durante um agendamento existente
        if (slotDate >= appointmentStart && slotDate < appointmentEnd) {
          return false;
        }

        // O slot não pode terminar durante um agendamento existente
        const slotEnd = new Date(slotDate);
        slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);
        if (slotEnd > appointmentStart && slotEnd <= appointmentEnd) {
          return false;
        }

        return true;
      });

      if (isAvailable) {
        slots.push(timeString);
      }
    }

    return slots;
  }
}
