import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GroupsController } from "./group.controller";
import { GroupService } from "./group.service";
import { Group, GroupSchema } from "./schema/group.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }], 'ShowTime')],
    controllers: [GroupsController],
    providers: [GroupService],
})

export class groupModule {}