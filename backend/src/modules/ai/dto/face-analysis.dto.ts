import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, IsOptional, IsObject } from 'class-validator';

export class FaceAnalysisDto {
  @ApiProperty({ description: 'URL da imagem a ser analisada' })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
