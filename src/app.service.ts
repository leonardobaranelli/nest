import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class AppService {
  constructor(
    private sequelize: Sequelize,
    @InjectStripe() public readonly stripeClient: Stripe,
  ) {}

  getCookie(req: Request): string {
    return req.cookies;
  }
}
