import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService, 
      private jwtService: JwtService 
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findEmail(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch && user.email && user.email === username) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, admin: user.admin, role: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
