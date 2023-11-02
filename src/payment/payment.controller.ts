import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('charges')
  async getCharges(): Promise<any> {
    const { stripeCharges, coinbaseAccounts } =
      await this.paymentService.getCharges();
    return {
      stripeCharges,
      coinbaseAccounts,
    };
  }
}
