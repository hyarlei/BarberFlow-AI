import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query, 
  Request, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { 
  ApiBearerAuth, 
  ApiBody, 
  ApiOperation, 
  ApiParam, 
  ApiQuery, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiTags('appointments')
@Controller('appointments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo agendamento' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.create(createAppointmentDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar agendamentos' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Itens por página' })
  @ApiQuery({ name: 'status', required: false, description: 'Status do agendamento' })
  @ApiQuery({ name: 'barberId', required: false, description: 'ID do barbeiro' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Data inicial (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Data final (YYYY-MM-DD)' })
  async findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
    @Query('barberId') barberId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('userId') userIdQuery?: string
  ) {
    console.log('🚀 [BACKEND] Recebendo request de agendamentos');
    console.log('👤 [BACKEND] Usuário autenticado:', {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    });
    console.log('📋 [BACKEND] Query params:', {
      page: +page,
      limit: +limit,
      status,
      barberId,
      startDate,
      endDate,
      userIdQuery
    });

    const isAdmin = req.user.role === UserRole.ADMIN;
    const isBarber = req.user.role === UserRole.BARBER;
    
    // Filtrar por barbeiro (se for barbeiro, mostra apenas os próprios)
    let filteredBarberId = barberId;
    if (isBarber) {
      // Aqui precisaríamos buscar o perfil de barbeiro do usuário
      // Por simplicidade, vamos apenas usar o ID do usuário
      filteredBarberId = req.user.id;
    }

    const searchParams = {
      page: +page,
      limit: +limit,
      status,
      barberId: filteredBarberId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      userId: isAdmin ? undefined : req.user.id
    };

    console.log('🔍 [BACKEND] Parâmetros para busca:', searchParams);

    const result = await this.appointmentsService.findAll(searchParams);
    
    console.log('✅ [BACKEND] Resultado da busca:', {
      total: result.meta.total,
      dataLength: result.data.length,
      page: result.meta.page
    });

    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um agendamento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Agendamento encontrado' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.appointmentsService.findOne(id, isAdmin ? undefined : req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um agendamento' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: 'Agendamento atualizado' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  async update(
    @Param('id') id: string, 
    @Body() updateAppointmentDto: UpdateAppointmentDto, 
    @Request() req
  ) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.appointmentsService.update(
      id, 
      updateAppointmentDto, 
      req.user.id, 
      isAdmin
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar um agendamento' })
  @ApiParam({ name: 'id', description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Agendamento cancelado' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.appointmentsService.cancel(id, req.user.id, isAdmin);
  }

  @Get('barber/:barberId/availability')
  @ApiOperation({ summary: 'Verificar disponibilidade de um barbeiro' })
  @ApiParam({ name: 'barberId', description: 'ID do barbeiro' })
  @ApiQuery({ name: 'date', required: true, description: 'Data (YYYY-MM-DD)' })
  async checkAvailability(
    @Param('barberId') barberId: string,
    @Query('date') date: string
  ) {
    return this.appointmentsService.checkBarberAvailability(
      barberId, 
      new Date(date)
    );
  }
}
