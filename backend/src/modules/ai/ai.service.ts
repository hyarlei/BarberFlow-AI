import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/prisma/prisma.service';
import * as axios from 'axios';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiServiceUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL', 'http://ai-service:5000');
  }

  async generateFaceAnalysis(imageUrl: string): Promise<any> {
    try {
      const response = await axios.default.post(`${this.aiServiceUrl}/face-analysis`, {
        imageUrl,
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Erro na análise facial: ${error.message}`, error.stack);
      throw new Error('Erro ao processar análise facial');
    }
  }

  async getPredictiveDemand(dateRange: { start: string; end: string }): Promise<any> {
    try {
      // Obter dados históricos de agendamentos
      const historicalData = await this.getHistoricalAppointmentData();
      
      // Chamar serviço de IA para previsão
      const response = await axios.default.post(`${this.aiServiceUrl}/predict-demand`, {
        historicalData,
        dateRange,
      });
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erro na previsão de demanda: ${error.message}`, error.stack);
      throw new Error('Erro ao gerar previsão de demanda');
    }
  }

  async getProductRecommendations(userId: string): Promise<any> {
    try {
      // Obter histórico do usuário
      const userHistory = await this.getUserPurchaseHistory(userId);
      
      // Chamar serviço de IA para recomendações
      const response = await axios.default.post(`${this.aiServiceUrl}/recommend-products`, {
        userId,
        history: userHistory,
      });
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erro nas recomendações de produto: ${error.message}`, error.stack);
      throw new Error('Erro ao gerar recomendações de produtos');
    }
  }

  async getServiceRecommendations(userId: string): Promise<any> {
    try {
      // Obter histórico do usuário
      const userHistory = await this.getUserServiceHistory(userId);
      
      // Chamar serviço de IA para recomendações
      const response = await axios.default.post(`${this.aiServiceUrl}/recommend-services`, {
        userId,
        history: userHistory,
      });
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erro nas recomendações de serviço: ${error.message}`, error.stack);
      throw new Error('Erro ao gerar recomendações de serviços');
    }
  }

  async getBarberMatching(userId: string): Promise<any> {
    try {
      // Obter preferências do usuário
      const userPreferences = await this.getUserPreferences(userId);
      
      // Obter dados de todos os barbeiros
      const barbers = await this.getBarberProfiles();
      
      // Chamar serviço de IA para matching
      const response = await axios.default.post(`${this.aiServiceUrl}/barber-matching`, {
        userId,
        preferences: userPreferences,
        barbers,
      });
      
      return response.data;
    } catch (error) {
      this.logger.error(`Erro no matching de barbeiro: ${error.message}`, error.stack);
      throw new Error('Erro ao encontrar barbeiros compatíveis');
    }
  }

  private async getHistoricalAppointmentData(): Promise<any[]> {
    // Obter dados históricos de agendamentos para análise
    const appointments = await this.prisma.appointment.findMany({
      select: {
        id: true,
        scheduledFor: true,
        serviceId: true,
        barberId: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        scheduledFor: 'asc',
      },
    });

    return appointments;
  }

  private async getUserPurchaseHistory(userId: string): Promise<any[]> {
    // Obter histórico de compras do usuário
    const payments = await this.prisma.payment.findMany({
      where: {
        userId,
        status: 'COMPLETED',
      },
      include: {
        appointment: {
          include: {
            service: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return payments;
  }

  private async getUserServiceHistory(userId: string): Promise<any[]> {
    // Obter histórico de serviços do usuário
    const appointments = await this.prisma.appointmentUser.findMany({
      where: {
        userId,
        appointment: {
          status: 'COMPLETED',
        },
      },
      include: {
        appointment: {
          include: {
            service: true,
            barber: {
              include: {
                profile: true,
              }
            }
          }
        }
      },
      orderBy: {
        appointment: {
          scheduledFor: 'desc',
        },
      },
    });

    return appointments;
  }

  private async getUserPreferences(userId: string): Promise<any> {
    // Obter perfil e preferências do usuário
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user || !user.profile) {
      return {};
    }

    return {
      preferences: user.profile.preferences || {},
    };
  }

  private async getBarberProfiles(): Promise<any[]> {
    // Obter todos os perfis de barbeiros
    const barbers = await this.prisma.barberProfile.findMany({
      include: {
        profile: true,
      },
    });

    return barbers;
  }
}
