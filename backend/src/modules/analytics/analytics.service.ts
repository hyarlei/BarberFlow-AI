import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(): Promise<any> {
    try {
      // Obter dados para o dashboard principal
      const [
        totalUsers,
        totalAppointments,
        totalRevenue,
        upcomingAppointments,
        recentPayments,
      ] = await Promise.all([
        this.getTotalUsers(),
        this.getTotalAppointments(),
        this.getTotalRevenue(),
        this.getUpcomingAppointments(),
        this.getRecentPayments(),
      ]);

      return {
        totalUsers,
        totalAppointments,
        totalRevenue,
        upcomingAppointments,
        recentPayments,
      };
    } catch (error) {
      this.logger.error(`Erro ao obter dados do dashboard: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getRevenueByPeriod(startDate: Date, endDate: Date): Promise<any> {
    try {
      // Consulta pagamentos no período
      const payments = await this.prisma.payment.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          status: 'COMPLETED',
        },
        select: {
          id: true,
          amount: true,
          createdAt: true,
        },
      });

      // Agrupar por data (formato YYYY-MM-DD)
      const revenueByDay = payments.reduce((acc, payment) => {
        const date = payment.createdAt.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += payment.amount;
        return acc;
      }, {});

      // Converter para formato de array para facilitar uso no frontend
      const result = Object.entries(revenueByDay).map(([date, amount]) => ({
        date,
        amount,
      }));

      return result.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      this.logger.error(`Erro ao obter receita por período: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getAppointmentsByService(): Promise<any> {
    try {
      // Consultar agendamentos agrupados por serviço
      const appointments = await this.prisma.appointment.findMany({
        include: {
          service: true,
        },
      });

      // Agrupar por serviço
      const serviceMap = appointments.reduce((acc, appointment) => {
        const serviceName = appointment.service.name;
        if (!acc[serviceName]) {
          acc[serviceName] = 0;
        }
        acc[serviceName]++;
        return acc;
      }, {});

      // Converter para formato de array
      return Object.entries(serviceMap).map(([name, count]) => ({
        name,
        count: count as number,
      })).sort((a, b) => b.count - a.count);
    } catch (error) {
      this.logger.error(`Erro ao obter agendamentos por serviço: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getBarberPerformance(): Promise<any> {
    try {
      // Consultar barbeiros com suas avaliações e agendamentos
      const barbers = await this.prisma.barberProfile.findMany({
        include: {
          profile: true,
          appointments: {
            where: {
              status: 'COMPLETED',
            },
          },
        },
      });

      return barbers.map(barber => ({
        id: barber.id,
        name: `${barber.profile.firstName} ${barber.profile.lastName}`,
        rating: barber.rating,
        appointmentsCount: barber.appointments.length,
        revenue: barber.appointments.reduce((sum, apt) => {
          return sum + (apt.totalPrice || 0);
        }, 0),
      }));
    } catch (error) {
      this.logger.error(`Erro ao obter performance dos barbeiros: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getClientRetentionRate(): Promise<any> {
    try {
      // Obter todos os clientes que fizeram agendamentos
      const clientAppointments = await this.prisma.appointmentUser.findMany({
        where: {
          user: {
            role: 'CLIENT',
          },
        },
        include: {
          user: true,
          appointment: true,
        },
      });

      // Agrupar agendamentos por cliente
      const clientsWithMultipleAppointments = clientAppointments.reduce((acc, record) => {
        const userId = record.userId;
        if (!acc[userId]) {
          acc[userId] = [];
        }
        acc[userId].push(record.appointment);
        return acc;
      }, {});

      // Calcular taxas de retenção
      const totalClients = Object.keys(clientsWithMultipleAppointments).length;
      const returningClients = Object.values(clientsWithMultipleAppointments).filter(
        appointments => (appointments as any[]).length > 1
      ).length;

      return {
        totalClients,
        returningClients,
        retentionRate: totalClients > 0 ? (returningClients / totalClients) * 100 : 0,
      };
    } catch (error) {
      this.logger.error(`Erro ao calcular taxa de retenção: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async getTotalUsers(): Promise<number> {
    return this.prisma.user.count({
      where: { role: 'CLIENT', isActive: true },
    });
  }

  private async getTotalAppointments(): Promise<number> {
    return this.prisma.appointment.count();
  }

  private async getTotalRevenue(): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });
    return result._sum.amount || 0;
  }

  private async getUpcomingAppointments(limit: number = 5): Promise<any[]> {
    const now = new Date();
    return this.prisma.appointment.findMany({
      where: {
        scheduledFor: { gte: now },
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
      },
      include: {
        service: true,
        barber: {
          include: {
            profile: true,
          },
        },
        users: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
      orderBy: { scheduledFor: 'asc' },
      take: limit,
    });
  }

  private async getRecentPayments(limit: number = 5): Promise<any[]> {
    return this.prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        appointment: {
          include: {
            service: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
