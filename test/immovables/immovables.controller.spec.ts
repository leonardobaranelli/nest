import { Test, TestingModule } from '@nestjs/testing';
import { ImmovablesController } from '../../src/immovables/immovables.controller';

describe('ImmovablesController', () => {
  let controller: ImmovablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImmovablesController],
    }).compile();

    controller = module.get<ImmovablesController>(ImmovablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
