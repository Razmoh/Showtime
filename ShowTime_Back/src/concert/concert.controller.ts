import { Controller, Post, Get, Put, Delete, Body, Param, Patch, Query} from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/enums/roles.decorator";
import { Public } from "src/public.local";
import { concertService } from "./concert.service";

@Controller('concerts')
export class concertController {
    constructor(private readonly concertService: concertService) {}

    @Roles(Role.Admin)
    @Post()
    async addConcert(
        @Body('title') concertsTitle: string,
        @Body('date') concertsDate: string,
        @Body('city') concertsCity: string,
        @Body('price') concertsPrice: string,
        @Body('group_id') concertsGroup_id: string,
    ) {
        return await this.concertService.insertConcert(concertsTitle,
                concertsDate,
                concertsCity,
                concertsPrice,
                concertsGroup_id,)
    }
    @Public()
    @Get()
    async getAllConcerts(){
        return await this.concertService.getConcerts();
    }

    @Get(':id')
    async getConcert(@Param('id') concertId: string){
        return await this.concertService.getSingleConcert(concertId)
    }

    @Public()
    @Get('name/filter')
    async getGroupConcert(@Query('name') param){
        return await this.concertService.getGroupConcert(param)
    }

    @Public()
    @Get('type/filter')
    async getTypeConcert(@Query('type') param){
        return await this.concertService.getTypeConcert(param)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async updateConcert(
        @Param('id') concertId: string,
        @Body('title') concertsTitle: string,
        @Body('date') concertsDate: string,
        @Body('city') concertsCity: string,
        @Body('price') concertsPrice: string,
        @Body('group_id') concertsGroup_id: string,
    )
    {
        const generatedId = await this.concertService.updateConcert(
            concertId, 
            concertsTitle, 
            concertsDate, 
            concertsCity, 
            concertsPrice, 
            concertsGroup_id, 
        )
        // return await this.concertService.getSingleConcert(concertId)
        return generatedId
    }
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteConcert(@Param('id') concertId: string) {
        await this.concertService.deleteTicket(concertId)
        return 'Concert deleted !'
    }
}