import { Test, TestingModule } from '@nestjs/testing';
import { AdsServiceService } from './ads-service.service';

describe('AdsServiceService', () => {
  let service: AdsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdsServiceService],
    }).compile();

    service = module.get<AdsServiceService>(AdsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
