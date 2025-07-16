import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServicesModule } from './services/services.module';
import { ProductsModule } from './products/products.module'; // <-- import the new module
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    UserModule,
    AppointmentsModule,
    ServicesModule,
    ProductsModule, // <-- add this line
  ],
  controllers: [AppController],
  providers: [AppService, MailerService], // add MailerService here
})
export class AppModule {}

// c:\Users\saoudi\Desktop\LineUpBarber\backend\src\app.module.ts
