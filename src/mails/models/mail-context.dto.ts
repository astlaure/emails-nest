import { IsNotEmpty } from 'class-validator';

export class MailContextDto {
  @IsNotEmpty()
  template: string;

  @IsNotEmpty()
  locale: string;

  @IsNotEmpty()
  email: string;
}
