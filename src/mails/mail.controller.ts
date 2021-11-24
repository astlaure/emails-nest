import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailContextDto } from './models/mail-context.dto';

@Controller('/mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  @HttpCode(200)
  async sendMail(@Body() mailContext: MailContextDto) {
    const { template, locale, ...rest } = mailContext;
    await this.mailService.sendEmail(template, locale, rest);
  }
}
