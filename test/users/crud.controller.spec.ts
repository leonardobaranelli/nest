import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from '../../src/users/controllers/user.controller';
import { CrudService } from '../../src/users/services/user.service';

describe('CrudController', () => {
  let controller: CrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [CrudService],
    }).compile();

    controller = module.get<CrudController>(CrudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
