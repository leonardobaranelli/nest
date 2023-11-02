import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class ContractService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3('https://bsc-testnet-dataseed.bnbchain.org');
  }

  async interactWithContract(
    contractAddress: string,
    startDate: string,
    endDate: string,
    postID: string,
    userID: string,
    callbackURL: string,
  ): Promise<string> {
    try {
      const ABIcontract = [
        {
          inputs: [
            { type: 'string', name: '_startDate' },
            { type: 'string', name: '_endDate' },
            { type: 'string', name: '_postID' },
            { type: 'string', name: '_userID' },
            { type: 'string', name: '_callbackURL' },
          ],
          name: 'RentalContract',
          outputs: [
            {
              type: 'string',
              name: '',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          constant: true,
          inputs: [],
          name: 'checkEndDate',
          outputs: [
            {
              type: 'string',
              name: '',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];

      const contract = new this.web3.eth.Contract(ABIcontract, contractAddress);

      await contract.deploy({
        data: '0xBBc000C296761f92917760479fC4049bE2517C66',
        arguments: [startDate, endDate, postID, userID, callbackURL],
      } as any);

      const result = (await contract.methods.checkEndDate().call()) as string;

      return result;
    } catch (error) {
      console.error('Error interacting with the contract:', error);
      throw error;
    }
  }
}
