import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(page?, sort?): Promise<IEvent[]> {
        var perPage = 10

        return await EventModel.find()
            .limit(perPage)
            .skip(perPage * (page - 1))
            .sort(sort)
            .exec()
    }

    async getYourEvents(city): Promise<IEvent[]> {
        return await EventModel.find({"city": city}).exec()
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, city } = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        city
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  
