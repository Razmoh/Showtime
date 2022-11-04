import { Controller, Get, Param, Post, Delete, Body, Put, UseGuards,} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/enums/roles.decorator';
import { Public } from 'src/public.local';
import { GroupDTO } from './dto/group.dto';
import { GroupService } from './group.service';


@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupService) {}
  
  @Public()
  @Get()
  getGroups(): object {
    return this.groupsService.findAll();
  }
  
  @Get(':id')
  getGroup(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }
  
  @Roles(Role.Admin)
  @Post()
  postGroups(@Body() body: GroupDTO) {
    console.log('<- POST Body: ', body);
    return this.groupsService.create(body);
  }
  
  @Roles(Role.Admin)
  @Put(':id')
  putGroup(@Param('id') id: string, @Body() body: GroupDTO) {
    console.log(id, '<- PUT Body: ', body);
    return this.groupsService.update(id, body);
  }
  
  @Roles(Role.Admin)
  @Delete(':id')
  deleteGroup(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }
}
