import { IsNotEmpty } from 'class-validator';

export class CreatePlapoDto {
  @IsNotEmpty()
  roomId: string;
}
