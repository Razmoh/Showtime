import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './schema/group.schema';
import { GroupDTO } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async create(GroupDTO: GroupDTO): Promise<Group> {
    const createdUser = new this.groupModel(GroupDTO);
    return createdUser.save();
  }

  async update(id: string, GroupDTO: GroupDTO): Promise<GroupDTO> {
    await this.groupModel.findByIdAndUpdate(id, GroupDTO).exec();
    return this.groupModel.findById(id).exec();
  }

  async delete(id: string): Promise<Group> {
    return await this.groupModel.findByIdAndDelete(id).exec();
  }
}
