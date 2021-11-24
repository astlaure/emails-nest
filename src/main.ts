import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MailService } from './mails/mail.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(MailService).loadLocales();
  app.get(MailService).loadTemplates();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
