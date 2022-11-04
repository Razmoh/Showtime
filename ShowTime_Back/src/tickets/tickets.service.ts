import { Injectable, NotFoundException } from "@nestjs/common";
import { ticket } from "./tickets.model";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
 

@Injectable()
export class ticketsService {
    private tickets: ticket[] = [];
    
    constructor(
        @InjectModel('Ticket') private readonly ticketModel: Model<ticket>,
    ) {}

    async insertTicket(
        user_id: string, 
        title: string, 
        date: string, 
        city: string, 
        price: string, 
        group: string, 
    ) 
    {   
        const newTicket = new this.ticketModel({
            user_id: user_id,
            title: title,
            date: date, 
            city: city,
            price: price,
            group: group,
        });
        const result = await newTicket.save();
        return result. id as string;
    }

    async getTickets() {
        const tickets = await this.ticketModel.find().exec()
        return tickets as ticket[]
    }

    async getSingleTicket(ticketId: string){
        const ticket = await this.findTicket(ticketId);
        return ticket;
    }

    async getUserTickets(user_id: string) {
        return await this.ticketModel.find({user_id: user_id}).exec();
    }

    async updateTicket(
        ticketId: string,
        user_id: string,
        title: string,
        date: string,
        city: string,
        price: string,
        group: string,
    )
    {
        const updatedTicket = await this.findTicket(ticketId)
        if (user_id) {
            updatedTicket.user_id = user_id
        }
        if (user_id) {
            updatedTicket.title = title
        }
        if (date) {
            updatedTicket.date = date
        }
        if (city) {
            updatedTicket.city = city
        }
        if (date) {
            updatedTicket.price = price
        }
        if (group) {
            updatedTicket.group = group
        }
        await updatedTicket.save();
        return this.ticketModel.findById(ticketId).exec();
    }

    async deleteTicket(ticketId: string){
        await this.ticketModel.findByIdAndDelete({_id: ticketId}).exec()
    }

    private async findTicket(id: string): Promise<ticket>{
        let ticket;
        try {
            ticket = await this.ticketModel.findById(id)
        } catch(error) {
            throw new NotFoundException('Could not find ticket');
        }
        if (!ticket) {
            throw new NotFoundException('Could not find ticket');
        }
        return ticket
    }
}