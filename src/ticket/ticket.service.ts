import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private readonly emailService: EmailService
  ) { }

  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticket = await this.ticketModel.create(createTicketDto)
      this.emailService.sendMail(createTicketDto.email, "Accuser de creation de votre ticket", createTicketDto.description);
      return ticket;
    } catch (error) {
      throw new HttpException("Erro creating the ticket", HttpStatus.EXPECTATION_FAILED)
    }
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
