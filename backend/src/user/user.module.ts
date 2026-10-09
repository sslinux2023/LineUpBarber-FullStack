import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerModule } from '../mailer/mailer.module';
import { PrismaService } from '../prisma/prisma.service'; // <-- Add this line
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MailerModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService], // <-- Add PrismaService here
  exports: [UserService],
})
export class UserModule {}
