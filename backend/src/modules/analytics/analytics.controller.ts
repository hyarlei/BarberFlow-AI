import { 
  Controller, 
  Get, 
  Query, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiQuery, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('analytics')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN, UserRole.BARBER)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obter dados para o dashboard principal' })
  @ApiResponse({ status: 200, description: 'Dados obtidos com sucesso' })
  async getDashboardData() {
    return this.analyticsService.getDashboardData();
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Obter receita por período' })
  @ApiQuery({ name: 'startDate', required: true, description: 'Data inicial (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: true, description: 'Data final (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Dados obtidos com sucesso' })
  async getRevenueByPeriod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Fim do dia
    return this.analyticsService.getRevenueByPeriod(start, end);
  }

  @Get('services')
  @ApiOperation({ summary: 'Obter agendamentos por serviço' })
  @ApiResponse({ status: 200, description: 'Dados obtidos com sucesso' })
  async getAppointmentsByService() {
    return this.analyticsService.getAppointmentsByService();
  }

  @Get('barbers')
  @ApiOperation({ summary: 'Obter performance dos barbeiros' })
  @ApiResponse({ status: 200, description: 'Dados obtidos com sucesso' })
  async getBarberPerformance() {
    return this.analyticsService.getBarberPerformance();
  }

  @Get('retention')
  @ApiOperation({ summary: 'Obter taxa de retenção de clientes' })
  @ApiResponse({ status: 200, description: 'Dados obtidos com sucesso' })
  async getClientRetentionRate() {
    return this.analyticsService.getClientRetentionRate();
  }
}
