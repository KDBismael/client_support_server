import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketService } from 'src/ticket/ticket.service';
import { Conversation, ConversationDocument } from './entities/conversation.entity';

@Injectable()
export class ConversationService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
        private ticketService: TicketService
    ) { }

    async findOrCreateConversation(conversationId: string, ticketId: string): Promise<any> {
        let conversation: any;

        if (conversationId) {
            try {
                conversation = await this.conversationModel.findById(conversationId);
            } catch (error) {
                console.error(`Invalid conversationId: ${conversationId}`, error);
                conversation = null;
            }
        }

        if (!conversation) {
            conversation = new this.conversationModel();
            await conversation.save();
            if (ticketId) {
                await this.ticketService.update(ticketId, { conversationId: conversation.id });
            }
        }
        return conversation;
    }
}
