import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP provider
    auth: {
      user: process.env.EMAIL_USER, // set in .env
      pass: process.env.EMAIL_PASS, // set in .env
    },
  });

  async sendWelcomeEmail(to: string, name: string) {
    try {
      await this.transporter.sendMail({
        from: `"LineUp Barber" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Welcome to LineUp Barber!',
        html: `<h2>Welcome, ${name}!</h2>
          <p>Thank you for registering at LineUp Barber. We’re excited to have you!</p>
          <p>Book your next appointment or shop our products anytime.</p>
          <br>
          <strong>LineUp Barber Team</strong>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }
  }
}
