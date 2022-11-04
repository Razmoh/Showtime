import { Controller, Get, Param, Post, Delete, Body, Put, UseGuards,} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { Public } from 'src/public.local';
import { Roles } from 'src/enums/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Roles(Role.Admin)
  @Get()
  getUsers(): object {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Public()
  @Post()
  postUsers(@Body() body: UserDTO) {
    console.log('<- POST Body: ', body);
    return this.usersService.create(body);
  }
  
  @Put(':id')
  putUsers(@Param('id') id: string, @Body() body: UserDTO) {
    console.log(id, '<- PUT Body: ', body);
    return this.usersService.update(id, body);
  }
  
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
