import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login-dto.class';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDTO: LoginDTO,
  ): Promise<{ user: IUser; jwt: string }> {
    const res = await this.authService.login(userDTO);
    return res;
  }
}
