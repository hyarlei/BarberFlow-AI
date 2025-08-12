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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  create(@Body() createServiceDto: CreateServiceDto, @Request() req) {
    return this.servicesService.create(createServiceDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('active') active?: boolean,
  ) {
    const isActive = active !== undefined ? active === true : undefined;
    
    return this.servicesService.findAll({
      page: +page,
      limit: +limit,
      category,
      isActive,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar serviço por ID' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Request() req,
  ) {
    return this.servicesService.update(id, updateServiceDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover serviço' })
  @ApiParam({ name: 'id', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Get('barber/:barberId')
  @ApiOperation({ summary: 'Listar serviços de um barbeiro' })
  @ApiParam({ name: 'barberId', description: 'ID do perfil do barbeiro' })
  @ApiResponse({ status: 200, description: 'Serviços listados com sucesso' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  getBarberServices(@Param('barberId') barberId: string) {
    return this.servicesService.getBarberServices(barberId);
  }

  @Post('barber/:barberId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BARBER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar um serviço ao barbeiro' })
  @ApiParam({ name: 'barberId', description: 'ID do perfil do barbeiro' })
  @ApiResponse({ status: 201, description: 'Serviço adicionado com sucesso' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  addBarberService(
    @Param('barberId') barberId: string,
    @Body() data: { serviceId: string; customPrice?: number },
    @Request() req,
  ) {
    // Verificar se é o próprio barbeiro ou admin
    if (req.user.role === UserRole.BARBER && req.user.id !== barberId) {
      throw new Error('Barbeiro só pode adicionar serviços ao seu próprio perfil');
    }
    
    return this.servicesService.addBarberService(barberId, data.serviceId, data.customPrice);
  }

  @Delete('barber/:barberId/:serviceId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BARBER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um serviço do barbeiro' })
  @ApiParam({ name: 'barberId', description: 'ID do perfil do barbeiro' })
  @ApiParam({ name: 'serviceId', description: 'ID do serviço' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço ou barbeiro não encontrado' })
  removeBarberService(
    @Param('barberId') barberId: string,
    @Param('serviceId') serviceId: string,
    @Request() req,
  ) {
    // Verificar se é o próprio barbeiro ou admin
    if (req.user.role === UserRole.BARBER && req.user.id !== barberId) {
      throw new Error('Barbeiro só pode remover serviços do seu próprio perfil');
    }
    
    return this.servicesService.removeBarberService(barberId, serviceId);
  }
}
