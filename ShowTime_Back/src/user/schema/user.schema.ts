import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  city: string;
  
  @Prop({default: "false"})
  admin: string;

  @Prop({default: Role.User })
  roles: Role[];

  @Prop(['string'])
  ticket: string[];

  @Prop(['string'])
  fav: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
