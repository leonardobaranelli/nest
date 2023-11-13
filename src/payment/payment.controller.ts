import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('stripeCharges')
  async getStripeCharges(): Promise<any> {    
    const { stripeCharges } = await this.paymentService.getStripeCharges();
    return {
      stripeCharges,
    };
  }

  @Post('createStripeCS')
  async createStripeCS(
    @Body() productData: { name: string; price: number; currency: string; postId: string }, 
  ) {
    const sessionId = await this.paymentService.createStripeCS(productData);
    return { sessionId, postId: productData.postId };
  }

  @Post('cleanStripeCharges')
  async cleanStripeCharges(): Promise<void> {
    await this.paymentService.cleanStripeCharges();
  }

  @Get('coinbaseCharges')
  async getCoinbaseCharges(): Promise<any> {    
    const { coinbaseAccounts } = await this.paymentService.getCoinbaseCharges();
    return {
      coinbaseAccounts,
    };
  }

  @Get('coinbaseAccounts')
  async getCoinbaseAccounts(): Promise<any> {    
    const { coinbaseAccounts } = await this.paymentService.getCoinbaseAccounts();
    return {
      coinbaseAccounts,
    };
  }
}