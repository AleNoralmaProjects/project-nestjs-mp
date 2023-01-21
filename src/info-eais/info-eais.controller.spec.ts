import { Test, TestingModule } from '@nestjs/testing';
import { InfoEaisController } from './info-eais.controller';
import { InfoEaisService } from './info-eais.service';

describe('InfoEaisController', () => {
  let controller: InfoEaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoEaisController],
      providers: [InfoEaisService],
    }).compile();

    controller = module.get<InfoEaisController>(InfoEaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
