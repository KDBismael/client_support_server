import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { ConversationService } from './conversation/conversation.service';
import { Conversation, ConversationSchema } from './conversation/entities/conversation.entity';
import { EmailService } from './email/email.service';
import { Message, MessageSchema } from './messages/entities/message.entity';
import { MessagesService } from './messages/messages.service';
import { Ticket, TicketSchema } from './ticket/entities/ticket.entity';
import { TicketModule } from './ticket/ticket.module';
import { TicketService } from './ticket/ticket.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/clientSupport'),
    TicketModule,
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, ChatGateway, TicketService, ConversationService, MessagesService],
})
export class AppModule { }
