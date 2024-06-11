import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    city: string;
    description: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true, default: "Almaty" },
  description: { type: String }
});

export default mongoose.model<IEvent>('Event', EventSchema);
