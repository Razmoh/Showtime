import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema } from "src/group/schema/group.schema";
import { concertController } from "./concert.controller";
import { concertSchema } from "./concert.model";
import { concertService } from "./concert.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Concert', schema: concertSchema }], 'ShowTime'),
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }], 'ShowTime')
    ],
    controllers: [concertController],
    providers: [concertService],
})

export class concertModule {}