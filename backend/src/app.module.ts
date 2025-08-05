import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';

// Core modules
import { PrismaModule } from './config/prisma/prisma.module';
import { AiModule } from './modules/ai/ai.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicesModule } from './modules/services/services.module';
import { UsersModule } from './modules/users/users.module';

// Common modules
import { CacheModule } from './common/cache/cache.module';
import { FileUploadModule } from './common/file-upload/file-upload.module';
import { MailModule } from './common/mail/mail.module';

// Health check
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Schedule and events
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),

    // Core modules
    PrismaModule,
    CacheModule,
    MailModule,
    FileUploadModule,

    // Feature modules
    AuthModule,
    UsersModule,
    AppointmentsModule,
    ServicesModule,
    PaymentsModule,
    NotificationsModule,
    AnalyticsModule,
    AiModule,
    ProductsModule,
    CampaignsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
