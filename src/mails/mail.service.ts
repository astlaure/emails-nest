import { BadRequestException, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';
import mjml from 'mjml';

@Injectable()
export class MailService {
  locales: { [language: string]: any } = {};
  templates: { [template: string]: any } = {};
  mailer: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.mailer = nodemailer.createTransport({
      pool: true,
      host: configService.get('SMTP_HOST'),
      port: configService.get<number>('SMTP_PORT'),
      secure: false, // use TLS
      auth: {
        user: configService.get('SMTP_USERNAME'),
        pass: configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendEmail(template: string, locale: string, context: any) {
    if (!this.templates[template] || !this.locales[locale] || !context.email) {
      throw new BadRequestException();
    }

    const data = {
      ...context,
      labels: this.locales[locale][template],
    };

    await this.mailer.sendMail({
      to: context.email,
      from: process.env.SMTP_FROM,
      subject: data.labels.subject,
      html: this.templates[template](data),
    });
  }

  loadLocales() {
    const files = fs.readdirSync(path.resolve('mails/locale'), {
      encoding: 'utf-8',
    });
    files.forEach((file) => {
      const json = fs.readFileSync(path.resolve(`mails/locale/${file}`), {
        encoding: 'utf-8',
      });
      this.locales[file.replace('.json', '')] = JSON.parse(json);
    });
  }

  loadTemplates() {
    const files = fs.readdirSync(path.resolve('mails/mjml'), {
      encoding: 'utf-8',
    });

    files.forEach((file) => {
      const template = fs.readFileSync(path.resolve(`mails/mjml/${file}`), {
        encoding: 'utf-8',
      });
      const { html } = mjml(template);
      this.templates[file.replace('.mjml', '')] = handlebars.compile(html);
    });
  }
}
