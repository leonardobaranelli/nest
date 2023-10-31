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
    //const coinbaseAccounts = await this.coinbaseClient.getAccounts();
    
    return {
      stripeCharges: stripeCharges.data,
      //coinbaseAccounts: coinbaseAccounts,
    };
  }

  async createProduct(productName: string): Promise<any> {
    const product = await this.stripeClient.products.create({
      name: productName,
      type: 'good',
      images: [
        "https://http2.mlstatic.com/D_NQ_NP_814792-MLA72401964025_102023-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_971589-MLA72401964061_102023-O.webp",
        "https://http2.mlstatic.com/D_NQ_NP_686949-MLA72401964035_102023-O.webp"
      ],
    });

    // Puedes agregar precios asociados al producto si es necesario
    // Aquí estoy creando un precio de $10 USD por ejemplo
    await this.stripeClient.prices.create({
      product: product.id,      
      unit_amount: 150000, // El monto está en centavos de la moneda especificada
      currency: 'usd',
    });

    return product;
  }

  async getProducts(): Promise<any> {
    const products = await this.stripeClient.products.list();
    return products.data;
  }
}

// "product": {
//   "id": "prod_OvD9eMcMq1NjzF",
//   "object": "product",
//   "active": true,
//   "attributes": [],
//   "caption": null,
//   "created": 1698777106,
//   "deactivate_on": [],
//   "default_price": 1500,
//   "description": "Linda casa",
//   "features": [],
//   "images": [
//     "https://http2.mlstatic.com/D_NQ_NP_814792-MLA72401964025_102023-O.webp",
//     "https://http2.mlstatic.com/D_NQ_NP_971589-MLA72401964061_102023-O.webp",
//     "https://http2.mlstatic.com/D_NQ_NP_686949-MLA72401964035_102023-O.webp"
//     ],
//   "livemode": false,
//   "metadata": {},
//   "name": "Casa en la colina",
//   "package_dimensions": null,
//   "shippable": true,
//   "tax_code": null,
//   "type": "Casa",
//   "updated": 1698777106,
//   "url": null
// }