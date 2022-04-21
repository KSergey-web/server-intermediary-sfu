import { Test, TestingModule } from '@nestjs/testing';
import { AxiosStrapiService } from './axios-strapi.service';

describe('AxiosStrapiService', () => {
  let service: AxiosStrapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosStrapiService],
    }).compile();

    service = module.get<AxiosStrapiService>(AxiosStrapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
