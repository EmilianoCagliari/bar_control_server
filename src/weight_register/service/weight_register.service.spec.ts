import { Test, TestingModule } from '@nestjs/testing';
import { WeightRegisterService } from './weight_register.service';

describe('WeightRegisterService', () => {
  let service: WeightRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightRegisterService],
    }).compile();

    service = module.get<WeightRegisterService>(WeightRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
