import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/email/email.service';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService, EmailService],
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),]
})
export class TicketModule { }
