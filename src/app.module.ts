import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mails/mail.module';

@Module({
  imports: [ConfigModule.forRoot(), MailModule],
})
export class AppModule {}
