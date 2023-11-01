import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService, ProductData } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get('charges')
  // async getCharges(): Promise<any> {    
  //   const { stripeCharges } = await this.paymentService.getCharges();
  //   return {
  //     stripeCharges,
  //   };
  // }

  // @Get('prices')
  // async getPrices(): Promise<any> {    
  //   const { stripePrices } = await this.paymentService.getPrices();
  //   return {
  //     stripePrices,
  //   };
  // }

  // @Post('createProduct')
  // async createProduct(@Body() productData: ProductData): Promise<any> {
  //   const product = await this.paymentService.createProduct(productData);
  //   return {
  //     product,
  //   };
  // }

  // @Get('products')
  // async getProducts(): Promise<any> {
  //   const products = await this.paymentService.getProducts();
  //   return {
  //     products,
  //   };
  // }

  // @Post('createCheckoutSession')
  // async createCheckoutSession(@Body() productData: { name: string, price: number, currency: string }) {
  //   const sessionId = await this.paymentService.createCheckoutSession(productData);
  //   return { sessionId };
  // }
}