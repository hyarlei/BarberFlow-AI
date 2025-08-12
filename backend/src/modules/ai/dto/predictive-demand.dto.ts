import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class PredictiveDemandDto {
  @ApiProperty({ description: 'Data inicial para previsão (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ description: 'Data final para previsão (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  end: string;
}
