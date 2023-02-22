import { IsOptional } from 'class-validator';

export class UpdatePlapoDto {
  @IsOptional()
  ave: number;

  @IsOptional()
  agreement: number;

  @IsOptional()
  isVisible: boolean;
}
