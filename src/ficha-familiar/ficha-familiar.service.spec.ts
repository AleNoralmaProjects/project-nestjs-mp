import { Test, TestingModule } from '@nestjs/testing';
import { FichaFamiliarService } from './ficha-familiar.service';

describe('FichaFamiliarService', () => {
  let service: FichaFamiliarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FichaFamiliarService],
    }).compile();

    service = module.get<FichaFamiliarService>(FichaFamiliarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
