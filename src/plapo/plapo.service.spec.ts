import { Test, TestingModule } from '@nestjs/testing';
import { PlapoService } from './plapo.service';

describe('PlapoService', () => {
  let service: PlapoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlapoService],
    }).compile();

    service = module.get<PlapoService>(PlapoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
