import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('charges')
  async getStripeCharges(): Promise<any> {    
    const charges = await this.paymentService.getCharges();
    return { charges };
  }
}