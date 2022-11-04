import { IsEmail, IsNotEmpty, IsArray } from 'class-validator';

export class UserDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  ticket?: string;
  fav?: string;

  name: string;
  admin?: string;
  city?: string;
  roles?: any;
}
