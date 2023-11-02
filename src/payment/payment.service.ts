import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Client } from 'coinbase';

@Injectable()
export class PaymentService {
  private coinbaseClient: Client;

  constructor(@InjectStripe() private readonly stripeClient: Stripe) {
    this.coinbaseClient = new Client({
      apiKey: process.env.COINBASE_API_KEY,
      apiSecret: process.env.COINBASE_API_SECRET,
    });
  }

  async getCharges(): Promise<any> {
    const stripeCharges = await this.stripeClient.charges.list();

    const coinbaseAccounts = await this.coinbaseClient.getAccounts();

    return {
      stripeCharges: stripeCharges.data,
      coinbaseAccounts: coinbaseAccounts,
    };
  }
}
