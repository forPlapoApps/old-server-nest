import { IsNotEmpty } from 'class-validator';

export class UpdateVoteDto {
  @IsNotEmpty()
  plapoId: string;

  @IsNotEmpty()
  value: number;
}
