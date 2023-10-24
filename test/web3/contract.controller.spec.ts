import { Test, TestingModule } from '@nestjs/testing';
import { ContractController } from '../../src/web3/contract.controller';
import { ContractService } from '../../src/web3/contract.service'; 

describe('ContractController', () => {
  let controller: ContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractController],
      providers: [ContractService], 
    }).compile();

    controller = module.get<ContractController>(ContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
