import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { htmlCreatedUser } from './templates/createdUser';

// interface MailerData {
//   subject: string;
//   emailTo: string;
//   emailFrom: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   message: string;
// }

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarCorreoCreated({ emailTo, emailFrom, firstName, code }) {
    const url = `${process.env.BACKEND_URL}/verify?code=${code}&email=${emailTo}`;
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        html: htmlCreatedUser(firstName, url),
      })
      .catch((error) => {
        {
          error: error.message;
        }
      });
  }
}
