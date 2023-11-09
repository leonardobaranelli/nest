import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Client } from 'coinbase';

export interface ProductData {
  productName: string;
  images: string;
  description: string;
  price?: number;
}

@Injectable()
export class PaymentService {
  private coinbaseClient: Client;
  private stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_API_SECRET, {});
    this.coinbaseClient = new Client({
      apiKey: process.env.COINBASE_API_KEY,
      apiSecret: process.env.COINBASE_API_SECRET,
    });
  }

  async getCharges(): Promise<any> {
    const coinbaseAccounts = await this.coinbaseClient.getAccounts();

    return {
      coinbaseAccounts: coinbaseAccounts,
    };
  }

  async createStripeCS(productData: {
    name: string;
    price: number;
    currency: string;
  }): Promise<string> {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: productData.currency,
            product_data: {
              name: productData.name,
            },
            unit_amount: productData.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url:  process.env.FRONTEND_URL,
      cancel_url: process.env.FRONTEND_URL,

    });

    return session.id;
  }
}
