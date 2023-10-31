import { Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('charges')
  async getCharges(): Promise<any> {    
    //const { stripeCharges, coinbaseAccounts } = await this.paymentService.getCharges();
    const { stripeCharges } = await this.paymentService.getCharges();
    return {
      stripeCharges,
      //coinbaseAccounts,
    };
  }

  @Post('createProduct')
  async createProduct(): Promise<any> {
    const product = await this.paymentService.createProduct('Casa de campo');
    return {
      product,
    };
  }

  @Get('products')
  async getProducts(): Promise<any> {
    const products = await this.paymentService.getProducts();
    return {
      products,
    };
  }
}