import * as bcrypt from 'bcrypt';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  HttpException,
  HttpStatus 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '../mailer/mailer.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try {
      const user = await this.userService.create({
        ...body,
        password: hashedPassword,
      });
      // Try to send email, but don't fail registration if it fails
      try {
        await this.mailerService.sendWelcomeEmail(user.email, user.name);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Optionally: return a warning to the frontend
      }
      return { id: user.id, name: user.name, email: user.email, role: user.role };
    } catch (error) {
      // Log the error for debugging
      console.error('Registration error:', error);
      // Show the real error message to the frontend
      throw new HttpException(error.message || 'Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(+id, updateUserDto);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const success = await this.userService.remove(+id);
      if (!success) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
