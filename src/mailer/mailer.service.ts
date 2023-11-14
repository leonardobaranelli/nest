import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { htmlCreatedUser } from './templates/createdUser';
import { htmlPropertyRent } from './templates/propertyRented';
import { htmlPropertySell } from './templates/propertySell';
import { htmlDeletedUser } from './templates/userDeleted';
//import { htmlForgotPassword } from './templates/forgotPassword'; --> Not implemented yet

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async created({ emailTo, emailFrom, firstName, code }) {
    const url = `${process.env.BACKEND_URL}/auth/verify?code=${code}&email=${emailTo}`;
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        html: htmlCreatedUser(firstName, url),
      })
      .catch((e) => {
        throw e;
      });
  }

  async forgotPassword({ emailTo, emailFrom, firstName, content }) {
    // Calc-Logic
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        // html: htmlForgotPassword(firstName, url),
      })
      .catch((e) => {
        throw e;
      });
  }

  async rent({
    emailTo,
    emailFrom,
    firstName,
    propName,
    startDate,
    endDate,
    amount,
  }) {
    // Calc-Logic
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        html: htmlPropertyRent({
          firstName,
          propName,
          startDate,
          endDate,
          amount,
        }),
      })
      .catch((e) => {
        throw e;
      });
  }

  async sell({ emailTo, emailFrom, firstName, propName, date, amount }) {
    // Calc-Logic
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        html: htmlPropertySell({
          firstName,
          propName,
          date,
          amount,
        }),
      })
      .catch((e) => {
        throw e;
      });
  }

  async deleted({ emailTo, emailFrom, firstName, username, deletedAt }) {
    // Calc-Logic
    await this.mailerService
      .sendMail({
        to: emailTo,
        from: emailFrom,
        subject: `🎉 Nest Account Created 🎉, <noreply@nest.com>`,
        html: htmlDeletedUser({
          firstName,
          username,
          deletedAt,
        }),
      })
      .catch((e) => {
        throw e;
      });
  }
}
