import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) { }

  create(createTicketDto: CreateTicketDto) {
    return this.ticketModel.create(createTicketDto);
  }

  findAll() {
    return this.ticketModel.find({});
  }

  findOne(id: string) {
    const ticket = this.ticketModel.findById(id)
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    const updatedTicket = this.ticketModel.findByIdAndUpdate(id, updateTicketDto, { new: true });
    if (!updatedTicket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return updatedTicket;
  }

  remove(id: string) {
    try {
      const result = this.ticketModel.findByIdAndDelete(id);
      console.log("Deleted ticket: ", result);
      return result;
    } catch (err) {
      throw new HttpException('Error when deleting ticket ' + id, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
