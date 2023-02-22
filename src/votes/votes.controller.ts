import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { UserGuardDecorator } from 'decorators/UserGuardDecorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @UserGuardDecorator() firebaseUser,
    @Body() updateVoteDto: UpdateVoteDto,
  ) {
    return this.votesService.update(id, firebaseUser.user_id, updateVoteDto);
  }
}
