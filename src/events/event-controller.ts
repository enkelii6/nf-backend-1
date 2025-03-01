import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';

class EventController {
    private eventService : EventService;


    constructor(eventService : EventService){
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
          const createEventDto: CreateEventDto = req.body;
          const event = await this.eventService.createEvent(createEventDto);
          res.status(201).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }



    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
          const { page = 1, sort = 'desc' } = req.query
          const pageNumber = parseInt(page as string)
          const sortDir = sort === 'asc' ? 'asc' : 'desc'
          const events = await this.eventService.getEvents(pageNumber, sortDir);
          res.status(200).json(events);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }

    getYourEvents = async (req: Request, res: Response): Promise<void> => {
        try {
          const user = (req as any).user
          const userCity = user.city
          const events = await this.eventService.getYourEvents(userCity);
          res.status(200).json(events);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
    }


    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const event = await this.eventService.getEventById(id);
          if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
          }
          res.status(200).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }
}

export default EventController;
