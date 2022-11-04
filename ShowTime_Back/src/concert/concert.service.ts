import { Injectable, NotFoundException } from "@nestjs/common";
import { concert } from "./concert.model";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Group, GroupDocument } from "src/group/schema/group.schema";
 

@Injectable()
export class concertService {
    private concerts: concert[] = [];
    
    constructor(
        @InjectModel('Concert') private readonly concertModel: Model<concert>,
        @InjectModel(Group.name) private groupModel: Model<GroupDocument>
    ) {}

    async insertConcert(
        title: string,
        date: string,
        city: string,
        price: string,
        group_id: string
    ) 
    {
        const newConcert = new this.concertModel({
            title: title,
            date: date,
            city: city,
            price: price,
            group_id: group_id
        });
        const result = await newConcert.save();
        const group = await this.groupModel.findById(result.group_id).exec();

        return {
            _id: result._id,
            title: result.title,
            city: result.city,
            date: result.date,
            price: result.price,
            group: group
        };
    }

    async getConcerts() {
        let newConcert = []
        const concerts = await this.concertModel.find().exec()
        for (const index in concerts) {
            const group = await this.groupModel.findById(concerts[index].group_id).exec();
            const concert = {
                _id: concerts[index]._id,
                title: concerts[index].title,
                city: concerts[index].city,
                date: concerts[index].date,
                price: concerts[index].price,
                group: group
            }
            newConcert.push(concert)
        }
        return newConcert
    }

    async getSingleConcert(concertId: string){
        const concert = await this.findConcert(concertId);
        const group = await this.groupModel.findById(concert.group_id).exec();
        return {
            _id: concert._id,
            title: concert.title,
            city: concert.city,
            date: concert.date,
            price: concert.price,
            group: group
        };
    }

    async getGroupConcert(group: string){
        let newConcert = []
        const groupsFind = await this.groupModel.findOne({name: group});
        const groups = groupsFind._id.valueOf()
        const concerts = await this.concertModel.find({group_id: groups}).exec()
        for (const index in concerts) {
            const group = await this.groupModel.findById(concerts[index].group_id).exec();
            const concert = {
                _id: concerts[index]._id,
                title: concerts[index].title,
                city: concerts[index].city,
                date: concerts[index].date,
                price: concerts[index].price,
                group: group
            }
            newConcert.push(concert)
        }
        return newConcert
    }

    async getTypeConcert(type: string){
        let newConcert = [];
        let newGroupsId;
        let concerts;
        const groupsFind = await this.groupModel.find({type: type});

        for (const key in groupsFind) {
            newGroupsId = groupsFind[key]._id.valueOf()
            concerts = await this.concertModel.find({group_id: newGroupsId}).exec()
            for (const key in concerts) {
                if (concerts[key] != null) {
                    const group = await this.groupModel.findById(concerts[key].group_id).exec();
                    const concert = {
                        _id: concerts[key]._id,
                        title: concerts[key].title,
                        city: concerts[key].city,
                        date: concerts[key].date,
                        price: concerts[key].price,
                        group: group
                    }
                    newConcert.push(concert)
                }
            }
        }
        return newConcert
    }

    async updateConcert(
        concertId: string,
        title: string,
        date: string,
        city: string,
        price: string,
        group_id: string
    )
    {
        let updatedTicket = await this.findConcert(concertId)
        
        if (title) {
            updatedTicket.title = title
        }
        if (date) {
            updatedTicket.date = date
        }
        if (city) {
            updatedTicket.city = city
        }
        if (price) {
            updatedTicket.price = price
        }
        if (group_id) {
            updatedTicket.group_id = group_id
        }
        updatedTicket.save();

        const group = await this.groupModel.findById(updatedTicket.group_id).exec()
        
        return {
            _id: updatedTicket._id,
            title: updatedTicket.title,
            date: updatedTicket.date,
            city: updatedTicket.city,
            price: updatedTicket.price,
            group: group
        };

    }

    async deleteTicket(concertId: string){
        await this.concertModel.findByIdAndDelete({_id: concertId}).exec()
    }

    private async findConcert(id: string): Promise<concert>{
        let concert;
        try {
            concert = await this.concertModel.findById(id)
        } catch(error) {
            throw new NotFoundException('Could not find concert');
        }
        if (!concert) {
            throw new NotFoundException('Could not find concert');
        }
        return concert
    }
}