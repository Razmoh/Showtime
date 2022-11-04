import * as mongoose from 'mongoose'

export const concertSchema = new mongoose.Schema({
  title: {type: String, required: true},
  date: {type: String, required: true},
  city: {type: String, required: true},
  price: {type: String, required: true},
  group_id: {type: String, required: true},
});

export interface concert extends mongoose.Document{
  id: string
  title: string;
  date: string;
  city: string;
  price: string;
  group_id: string;
}