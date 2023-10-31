import { Controller, Get, Param } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get(':address/:startDate/:endDate/:postID/:userID/:callbackURL')
  async interactWithContract(
    @Param('address') contractAddress: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    @Param('postID') postID: string,
    @Param('userID') userID: string,
    @Param('callbackURL') callbackURL: string,
  ): Promise<any> {
    try {
      const contractInfo = await this.contractService.interactWithContract(
        contractAddress,
        startDate,
        endDate,
        postID,
        userID,
        callbackURL,
      );
      return {
        contractAddress: contractAddress,
        contractInfo: contractInfo,
      };
    } catch (error) {
      return `Error interacting with the contract: ${error.message}`;
    }
  }
}