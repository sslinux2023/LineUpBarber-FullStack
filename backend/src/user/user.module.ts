import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerModule } from '../mailer/mailer.module';
import { PrismaService } from '../prisma/prisma.service'; // <-- Add this line

@Module({
  imports: [MailerModule],
  controllers: [UserController],
  providers: [UserService, PrismaService], // <-- Add PrismaService here
  exports: [UserService],
})
export class UserModule {}