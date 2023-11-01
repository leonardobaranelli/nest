import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
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
  
  //constructor(@InjectStripe() private readonly stripeClient: Stripe) {
  constructor() {    
    this.stripeClient = new Stripe(process.env.STRIPE_API_SECRET, {
      // Configuración adicional de Stripe (si es necesario)
      // apiVersion: '2020-08-27',
    });

    this.coinbaseClient = new Client({
      apiKey: process.env.COINBASE_API_KEY,
      apiSecret: process.env.COINBASE_API_SECRET,
    });
  }

  async getCharges(): Promise<any> {
    const stripeCharges = await this.stripeClient.charges.list();
    //const coinbaseAccounts = await this.coinbaseClient.getAccounts();

    return {
      stripeCharges: stripeCharges.data,
      //coinbaseAccounts: coinbaseAccounts,
    };
  }

  async getPrices(): Promise<any> {
    const stripePrices = await this.stripeClient.prices.list();

    return {
      stripePrices: stripePrices.data,
    }
  }    

  async createProduct(productData: ProductData): Promise<any> {
    const product = await this.stripeClient.products.create({
      name: productData.productName,
      type: 'good',
      images: [productData.images],
      description: productData.description,
    });

    const unitAmount = productData.price !== undefined ? productData.price * 100 : 150000;

    await this.stripeClient.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency: 'usd',
    });

    return product;
  } 

  async getProducts(): Promise<any> {
    const products = await this.stripeClient.products.list();
    return products.data;
  }

  async createCheckoutSession(productData: { name: string, price: number, currency: string }): Promise<string> {
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
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/',
    });
  
    return session.id;
  }
}