import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('test')
  async test(@Body() body: { to: string, name: string }) {
    await this.mailerService.sendWelcomeEmail(body.to, body.name);
    return { message: 'Test email sent (if no error)' };
  }
}