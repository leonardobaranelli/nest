import { Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class ContractService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3('https://bsc-testnet-dataseed.bnbchain.org');
  }

  async getHiWorld(contractAddress: string): Promise<string> {
    try {
      const ABIcontract = [
        {
          inputs: [],
          name: 'sayHelloWorld',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ];

      const contract = new this.web3.eth.Contract(ABIcontract, contractAddress);

      const result = await contract.methods.sayHelloWorld().call();

      if (typeof result !== 'string') {
        console.warn('HelloWorld result is not a string:', result);
        return '';
      }

      return result;
    } catch (error) {
      console.error('Error getting helloworld:', error);
      throw error;
    }
  }
}
