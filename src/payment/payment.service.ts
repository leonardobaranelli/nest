import { Injectable } from '@nestjs/common';
import { Client } from 'coinbase';
import Stripe from 'stripe';

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

  async getStripeCharges(): Promise<any> {
    const stripeCharges = await this.stripeClient.charges.list();

    const filteredCharges = stripeCharges.data.filter(
      (charge) => charge.amount_refunded === 0 && charge.currency === 'usd' && !charge.livemode
    );

    return {
      stripeCharges: filteredCharges,
    };
  }  

  async createStripeCS(productData: {
    name: string;
    price: number;
    currency: string;
    postId: string;    
  }): Promise<string> {
    let session;
  
    try {
      session = await this.stripeClient.checkout.sessions.create({
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
        success_url: `${process.env.FRONTEND_URL}/Views/Payment?postId=${productData.postId}`,
        cancel_url: `${process.env.FRONTEND_URL}`,
        payment_intent_data: {
          metadata: {
            postId: productData.postId,
          },
        },
      });
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      throw new Error('Error creating Stripe session');
    }
  
    if (!session || !session.id) {
      console.error('Error: La sesión de Stripe no se creó correctamente.');
      throw new Error('Error creating Stripe session');
    }
  
    return session.id;
  }

  async refundStripeCharge(chargeId: string): Promise<any> {
    const refund = await this.stripeClient.refunds.create({
      charge: chargeId,
    });

    return refund;
  }

  async cleanStripeCharges(): Promise<void> {
    console.log('Cleaning test charges...');
    const testCharges = await this.stripeClient.charges.list({
      limit: 100,
    });
  
    let chargesToRefund = testCharges.data.filter((charge) => !charge.refunded);
  
    if (chargesToRefund.length === 0) {
      console.log('No charges to refund.');
      return;
    }
  
    for (const charge of chargesToRefund) {
      console.log(`Processing charge: ${charge.id}`);
  
      try {
        console.log(`Refunding charge: ${charge.id}`);
        await this.refundStripeCharge(charge.id);
        console.log(`Charge ${charge.id} successfully refunded.`);
      } catch (error) {
        console.error(`Error refunding charge ${charge.id}:`, error);
      }
    }
  
    console.log('Cleaning completed.');
  }

  async getCoinbaseCharges(): Promise<any> {
    try {
      const coinbaseCharges: any = await (this.coinbaseClient as any).listCharges();
      return {
        coinbaseCharges,
      };
    } catch (error) {
      console.error('Error getting charges from Coinbase:', error);
      throw error;
    }
  }

  async getCoinbaseAccounts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.coinbaseClient.getAccounts({}, (error, accounts) => {
        if (error) {
          console.error('Error getting accounts from Coinbase:', error);
          reject(error);
        } else {
          resolve(accounts);
        }
      });
    });
  }
}
