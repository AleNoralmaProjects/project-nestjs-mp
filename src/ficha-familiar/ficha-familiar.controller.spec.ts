import { Test, TestingModule } from '@nestjs/testing';
import { FichaFamiliarController } from './ficha-familiar.controller';
import { FichaFamiliarService } from './ficha-familiar.service';

describe('FichaFamiliarController', () => {
  let controller: FichaFamiliarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaFamiliarController],
      providers: [FichaFamiliarService],
    }).compile();

    controller = module.get<FichaFamiliarController>(FichaFamiliarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
