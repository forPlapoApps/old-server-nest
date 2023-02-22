import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlapoDto {
  @IsOptional()
  ave: number;

  @IsOptional()
  agreement: number;

  @IsBoolean()
  isVisible: boolean;
}
