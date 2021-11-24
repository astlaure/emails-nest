import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ValidationError } from 'yup';
import { MailService } from './mail.service';
import mailContextValidator from './validators/mail-context.validator';

@Controller('/mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  @HttpCode(200)
  async sendMail(@Body() body) {
    try {
      const data = await mailContextValidator.validate(body, {
        abortEarly: false,
      });
      const { template, locale, ...rest } = data;
      await this.mailService.sendEmail(template, locale, rest);
    } catch (err) {
      if (err instanceof ValidationError) {
        return err.errors;
      }
      throw new InternalServerErrorException();
    }
  }
}
