import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'mailer.nest.app@gmail.com',
          pass: 'bawyyambefwxdkkr',
        },
      },
    }),
  ],
  providers: [AppMailerService],
  exports: [AppMailerService],
})
export class AppMailerModule {}