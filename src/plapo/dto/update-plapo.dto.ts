import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdatePlapoDto {
  @IsNumber()
  @IsOptional()
  ave?: number;

  @IsNumber()
  @IsOptional()
  agreement?: number;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
