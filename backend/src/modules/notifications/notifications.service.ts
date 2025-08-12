import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    try {
      // Criar registro da notificação no banco
      const notification = await this.prisma.notification.create({
        data: {
          userId: createNotificationDto.userId,
          title: createNotificationDto.title,
          message: createNotificationDto.content,
          content: createNotificationDto.content,
          type: createNotificationDto.type,
          link: createNotificationDto.link,
          metadata: createNotificationDto.metadata,
          isRead: false,
        },
      });

      // Enviar notificação pelo canal apropriado
      await this.sendNotification(notification);

      return notification;
    } catch (error) {
      this.logger.error(`Erro ao criar notificação: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAllByUser(userId: string, page = 1, limit = 10): Promise<{ data: Notification[]; meta: any }> {
    const skip = (page - 1) * limit;
    
    // Contar total de notificações
    const total = await this.prisma.notification.count({
      where: { userId },
    });

    // Buscar notificações com paginação
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: notifications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    // Verificar se a notificação existe e pertence ao usuário
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      throw new Error('Notificação não encontrada');
    }

    // Marcar como lida
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async deleteNotification(id: string, userId: string): Promise<void> {
    // Verificar se a notificação existe e pertence ao usuário
    const notification = await this.prisma.notification.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!notification) {
      throw new Error('Notificação não encontrada');
    }

    // Excluir notificação
    await this.prisma.notification.delete({
      where: { id },
    });
  }

  private async sendNotification(notification: Notification): Promise<void> {
    try {
      switch (notification.type) {
        case NotificationType.EMAIL:
          await this.sendEmailNotification(notification);
          break;
        case NotificationType.SMS:
          await this.sendSmsNotification(notification);
          break;
        case NotificationType.WHATSAPP:
          await this.sendWhatsAppNotification(notification);
          break;
        case NotificationType.PUSH:
          await this.sendPushNotification(notification);
          break;
        default:
          this.logger.warn(`Tipo de notificação não implementado: ${notification.type}`);
      }
    } catch (error) {
      this.logger.error(`Erro ao enviar notificação: ${error.message}`, error.stack);
      // Não propagar o erro para não interromper o fluxo
      // A notificação já foi salva no banco
    }
  }

  private async sendEmailNotification(notification: Notification): Promise<void> {
    // Implementação simplificada - em produção, integrar com serviço de e-mail
    this.logger.log(`[E-MAIL] Para: ${notification.userId}, Título: ${notification.title}`);
    // Integração com serviço de e-mail aqui (nodemailer, sendgrid, etc.)
  }

  private async sendSmsNotification(notification: Notification): Promise<void> {
    // Implementação simplificada - em produção, integrar com serviço de SMS
    this.logger.log(`[SMS] Para: ${notification.userId}, Conteúdo: ${notification.message}`);
    // Integração com serviço de SMS aqui (Twilio, AWS SNS, etc.)
  }

  private async sendWhatsAppNotification(notification: Notification): Promise<void> {
    // Implementação simplificada - em produção, integrar com API do WhatsApp
    this.logger.log(`[WhatsApp] Para: ${notification.userId}, Mensagem: ${notification.message}`);
    // Integração com WhatsApp Business API aqui
  }

  private async sendPushNotification(notification: Notification): Promise<void> {
    // Implementação simplificada - em produção, integrar com serviço de push
    this.logger.log(`[Push] Para: ${notification.userId}, Título: ${notification.title}`);
    // Integração com serviço de push aqui (Firebase Cloud Messaging, OneSignal, etc.)
  }
}
