import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, userId: string): Promise<Payment> {
    // Verificar se o agendamento existe
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: createPaymentDto.appointmentId },
      include: { payments: true },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Verificar se já existe um pagamento completo para este agendamento
    if (appointment.payments.some(payment => payment.status === PaymentStatus.COMPLETED)) {
      throw new BadRequestException('Este agendamento já possui um pagamento concluído');
    }

    // Criar o pagamento
    return this.prisma.payment.create({
      data: {
        amount: createPaymentDto.amount,
        method: createPaymentDto.method,
        status: createPaymentDto.status || PaymentStatus.PENDING,
        transactionId: createPaymentDto.transactionId,
        metadata: createPaymentDto.metadata,
        appointment: {
          connect: { id: createPaymentDto.appointmentId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(page = 1, limit = 10, userId?: string): Promise<{ data: Payment[]; meta: any }> {
    const skip = (page - 1) * limit;
    
    // Construir o filtro
    const where = userId ? { userId } : {};

    // Contar total de pagamentos
    const total = await this.prisma.payment.count({ where });

    // Buscar pagamentos com paginação
    const payments = await this.prisma.payment.findMany({
      where,
      include: {
        appointment: {
          include: {
            service: true,
            barber: {
              include: {
                profile: true,
              }
            },
          }
        },
        user: {
          include: {
            profile: true,
          }
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: payments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        appointment: {
          include: {
            service: true,
            barber: {
              include: {
                profile: true,
              }
            },
          }
        },
        user: {
          include: {
            profile: true,
          }
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    // Verificar se o pagamento existe
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    // Atualizar o pagamento
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: updatePaymentDto.status,
        transactionId: updatePaymentDto.transactionId,
        metadata: updatePaymentDto.metadata,
      },
    });
  }

  async processWebhook(data: any): Promise<any> {
    // Implementar lógica para processar webhooks dos gateways de pagamento
    // Exemplo: Stripe, Mercado Pago, etc.
    const { type, data: paymentData } = data;
    
    // Exemplo de processamento
    if (type === 'payment.updated' && paymentData.transactionId) {
      const payment = await this.prisma.payment.findFirst({
        where: { transactionId: paymentData.transactionId },
      });
      
      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: this.mapExternalStatusToPrisma(paymentData.status),
            metadata: payment.metadata 
              ? { ...JSON.parse(JSON.stringify(payment.metadata)), webhookData: paymentData } 
              : { webhookData: paymentData },
          },
        });
        
        return { success: true, message: 'Pagamento atualizado com sucesso' };
      }
    }
    
    return { success: false, message: 'Nenhum pagamento encontrado ou atualizado' };
  }
  
  private mapExternalStatusToPrisma(externalStatus: string): PaymentStatus {
    // Mapear status externos para o enum PaymentStatus
    const statusMap = {
      'approved': PaymentStatus.COMPLETED,
      'pending': PaymentStatus.PENDING,
      'in_process': PaymentStatus.PROCESSING,
      'rejected': PaymentStatus.FAILED,
      'refunded': PaymentStatus.REFUNDED,
      // Adicionar mais mapeamentos conforme necessário
    };
    
    return statusMap[externalStatus] || PaymentStatus.PENDING;
  }
}
