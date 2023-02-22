import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { PlapoService } from './plapo.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UpdatePlapoDto } from './dto/update-plapo.dto';

@Controller('plapo')
export class PlapoController {
  constructor(private readonly plapoService: PlapoService) {}

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePlapoDto: UpdatePlapoDto) {
    return this.plapoService.update(id, updatePlapoDto);
  }
}
