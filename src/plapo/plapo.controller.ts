import { Controller } from '@nestjs/common';
import { PlapoService } from './plapo.service';

@Controller('plapo')
export class PlapoController {
  constructor(private readonly plapoService: PlapoService) {}
}
