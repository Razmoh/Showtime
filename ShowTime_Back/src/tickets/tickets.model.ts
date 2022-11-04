import * as mongoose from 'mongoose'

export const ticketSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  title: {type: String, required: true},
  date: {type: String, required: true},
  city: {type: String, required: true},
  price: {type: String, required: true},
  group: {type: Object, required: true},
});

export interface ticket extends mongoose.Document{
  id: string
  user_id: string;
  title: string;
  date: string;
  city: string;
  price: string;
  group: Object;
}