import { Test, TestingModule } from '@nestjs/testing';
import { ImmovablesService } from '../../src/immovables/immovables.service';

describe('ImmovablesService', () => {
  let service: ImmovablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImmovablesService],
    }).compile();

    service = module.get<ImmovablesService>(ImmovablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
