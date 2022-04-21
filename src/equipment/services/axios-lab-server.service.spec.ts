import { Test, TestingModule } from '@nestjs/testing';
import { AxiosLabServerService } from './axios-lab-server.service';

describe('AxiosLabServerService', () => {
  let service: AxiosLabServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosLabServerService],
    }).compile();

    service = module.get<AxiosLabServerService>(AxiosLabServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
