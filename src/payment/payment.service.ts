import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async getCharges(): Promise<any> {    
    const charges = await this.stripeClient.charges.list();
    return charges.data;
  }
}