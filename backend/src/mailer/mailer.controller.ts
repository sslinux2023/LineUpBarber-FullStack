import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('test')
  async test(@Body() body: { to: string; name: string }) {
    await this.mailerService.sendWelcomeEmail(body.to, body.name);
    return { message: 'Test email sent (if no error)' };
  }
}
