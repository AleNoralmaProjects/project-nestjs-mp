import { Test, TestingModule } from '@nestjs/testing';
import { BrigadaEaisService } from './brigada-eais.service';

describe('BrigadaEaisService', () => {
  let service: BrigadaEaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrigadaEaisService],
    }).compile();

    service = module.get<BrigadaEaisService>(BrigadaEaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
