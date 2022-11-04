import { Controller, Post, Get, Put, Delete, Body, Param, Patch} from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/enums/roles.decorator";
import { Public } from "src/public.local";
import { ticketsService } from "./tickets.service";

@Controller('tickets')
export class ticketsController {
    constructor(private readonly ticketsService: ticketsService) {}

    @Post()
    async addTicket(
        @Body('user_id') ticketsUser_id: string,
        @Body('title') ticketsTitle: string,
        @Body('date') ticketsDate: string,
        @Body('city') ticketsCity: string,
        @Body('price') ticketsPrice: string,
        @Body('group') ticketsGroup: string, 

    ) {
        const generatedId = await this.ticketsService.insertTicket(
            ticketsUser_id,
            ticketsTitle,
            ticketsDate,
            ticketsCity,
            ticketsPrice,
            ticketsGroup,
        )
        return {
            _id: generatedId, 
            user_id: ticketsUser_id, 
            title: ticketsTitle,
            date: ticketsDate,
            city: ticketsCity,
            price: ticketsPrice,
            group: ticketsGroup,
        }
    }

    @Get()
    async getAllTickets(){
        return await this.ticketsService.getTickets();
    }

    @Get(':id')
    async getProduct(@Param('id') ticketsId: string){
        return await this.ticketsService.getSingleTicket(ticketsId)
    }

    @Public()
    @Get('user/:user_id')
    async getUserTickets(@Param('user_id') user_id: string){
        // return {"TEMP": "temp"}
        return await this.ticketsService.getUserTickets(user_id)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async updateProduct(
        @Param('id') ticketId: string,
        @Body('user_id') ticketsUser_id: string,
        @Body('title') ticketsTitle: string,
        @Body('date') ticketsDate: string,
        @Body('city') ticketsCity: string,
        @Body('price') ticketsPrice: string,
        @Body('group') ticketsGroup: string, 
    )
    {
        const ticket = await this.ticketsService.updateTicket(
            ticketId, 
            ticketsUser_id,
            ticketsTitle,
            ticketsDate,
            ticketsCity,
            ticketsPrice,
            ticketsGroup,
        )
        return ticket
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async deleteTicket(@Param('id') ticketId: string) {
        await this.ticketsService.deleteTicket(ticketId)
        return 'Ticket deleted !'
    }
}