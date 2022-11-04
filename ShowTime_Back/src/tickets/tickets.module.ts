import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ticketsController } from "./tickets.controller";
import { ticketSchema } from "./tickets.model";
import { ticketsService } from "./tickets.service";


@Module({
    imports: [MongooseModule.forFeature([{name: 'Ticket', schema: ticketSchema }], "ShowTime")],
    controllers: [ticketsController],
    providers: [ticketsService],
})

export class ticketsModule {}