import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketService } from 'src/ticket/ticket.service';
import { Conversation, ConversationDocument } from './entities/conversation.entity';

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
        private ticketServie: TicketService
    ) { }

    async findOrCreateConversation(conversationId: string, ticketId: string): Promise<any> {
        console.log(conversationId)
        let conversation = await this.conversationModel.findById(conversationId);

        if (!conversation) {
            conversation = new this.conversationModel();
            await conversation.save();
            await this.ticketServie.update(ticketId, { conversationId: conversation.id })
        }
        return conversation;
    }
}
