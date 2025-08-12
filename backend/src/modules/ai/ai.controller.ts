import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AiService } from './ai.service';
import { FaceAnalysisDto } from './dto/face-analysis.dto';
import { PredictiveDemandDto } from './dto/predictive-demand.dto';

@ApiTags('ai')
@Controller('ai')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('face-analysis')
  @ApiOperation({ summary: 'Analisar características faciais' })
  @ApiResponse({ status: 200, description: 'Análise realizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async analyzeFace(@Body() faceAnalysisDto: FaceAnalysisDto) {
    return this.aiService.generateFaceAnalysis(faceAnalysisDto.imageUrl);
  }

  @Post('predict-demand')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BARBER)
  @ApiOperation({ summary: 'Prever demanda de agendamentos' })
  @ApiResponse({ status: 200, description: 'Previsão gerada com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  async predictDemand(@Body() predictiveDemandDto: PredictiveDemandDto) {
    return this.aiService.getPredictiveDemand(predictiveDemandDto);
  }

  @Get('recommend-products/:userId')
  @ApiOperation({ summary: 'Recomendar produtos para um usuário' })
  @ApiResponse({ status: 200, description: 'Recomendações geradas com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getProductRecommendations(@Param('userId') userId: string) {
    return this.aiService.getProductRecommendations(userId);
  }

  @Get('recommend-services/:userId')
  @ApiOperation({ summary: 'Recomendar serviços para um usuário' })
  @ApiResponse({ status: 200, description: 'Recomendações geradas com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getServiceRecommendations(@Param('userId') userId: string) {
    return this.aiService.getServiceRecommendations(userId);
  }

  @Get('barber-matching/:userId')
  @ApiOperation({ summary: 'Encontrar barbeiros compatíveis com o usuário' })
  @ApiResponse({ status: 200, description: 'Matching realizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getBarberMatching(@Param('userId') userId: string) {
    return this.aiService.getBarberMatching(userId);
  }
}
