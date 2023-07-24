import { Test, TestingModule } from '@nestjs/testing';
import { WeightRegisterController } from './weight_register.controller';
import { WeightRegisterService } from '../service/weight_register.service';

describe('WeightRegisterController', () => {
  let controller: WeightRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightRegisterController],
      providers: [WeightRegisterService],
    }).compile();

    controller = module.get<WeightRegisterController>(WeightRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
