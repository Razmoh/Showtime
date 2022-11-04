import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findEmail(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async create(UserDTO: UserDTO): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(UserDTO.password, saltOrRounds);
    const salt = await bcrypt.genSalt()
    UserDTO.password = hash
    const createdUser = new this.userModel(UserDTO);
    return createdUser.save();
  }

  async register(UserDTO: UserDTO): Promise<User> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(UserDTO.password, saltOrRounds);
    const salt = await bcrypt.genSalt()
    UserDTO.password = hash
    if(UserDTO.admin == "true") {
      throw new ForbiddenException("You shall not pass")
    }
    if (UserDTO.roles == ["admin"]) {
      throw new ForbiddenException("You shall not pass")
    }
    const createdUser = new this.userModel(UserDTO);
    return createdUser.save();
  }

  async update(id: string, UserDTO: UserDTO): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, UserDTO).exec();
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
