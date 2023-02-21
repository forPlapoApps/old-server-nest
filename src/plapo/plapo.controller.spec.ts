import { Test, TestingModule } from '@nestjs/testing';
import { PlapoController } from './plapo.controller';
import { PlapoService } from './plapo.service';

describe('PlapoController', () => {
  let controller: PlapoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlapoController],
      providers: [PlapoService],
    }).compile();

    controller = module.get<PlapoController>(PlapoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
