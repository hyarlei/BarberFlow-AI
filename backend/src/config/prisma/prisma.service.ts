import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    // Lista explícita dos modelos para evitar tentar chamar deleteMany em propriedades que não são modelos
    const models = [
      'user',
      'profile',
      'barberProfile', 
      'appointment',
      'appointmentUser',
      'service',
      'barberService',
      'payment',
      'review',
      'notification',
      'loyaltyPoint',
      'campaign',
      'product',
      'userBehavior',
      'predictionModel'
    ];

    const deletePromises = models.map(async (modelName) => {
      try {
        if (this[modelName] && typeof this[modelName].deleteMany === 'function') {
          await this[modelName].deleteMany();
          console.log(`✅ Cleaned ${modelName} table`);
        }
      } catch (error) {
        console.log(`⚠️ Could not clean ${modelName}: ${error.message}`);
      }
    });

    return Promise.all(deletePromises);
  }
}
