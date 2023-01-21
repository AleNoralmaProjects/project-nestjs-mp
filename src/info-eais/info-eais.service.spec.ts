import { Test, TestingModule } from '@nestjs/testing';
import { InfoEaisService } from './info-eais.service';

describe('InfoEaisService', () => {
  let service: InfoEaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoEaisService],
    }).compile();

    service = module.get<InfoEaisService>(InfoEaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
