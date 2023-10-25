import { Controller, Get, Param } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get(':adress')
  async getHiWorld(@Param('adress') contractAdress: string): Promise<any> {
    try {
      const contractInfo =
        await this.contractService.getHiWorld(contractAdress);
      return {
        contractAdress: contractAdress,
        contractInfo: contractInfo,
      };
    } catch (error) {
      return `Error getting contract information: ${error.message}`;
    }
  }
}

//0x971ed179866ade77a823007f32dfecb7b9d4007b
