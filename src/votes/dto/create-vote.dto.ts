import { IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  plapoId: string;
}
