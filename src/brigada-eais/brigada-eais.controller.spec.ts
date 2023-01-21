import { Test, TestingModule } from '@nestjs/testing';
import { BrigadaEaisController } from './brigada-eais.controller';
import { BrigadaEaisService } from './brigada-eais.service';

describe('BrigadaEaisController', () => {
  let controller: BrigadaEaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadaEaisController],
      providers: [BrigadaEaisService],
    }).compile();

    controller = module.get<BrigadaEaisController>(BrigadaEaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
