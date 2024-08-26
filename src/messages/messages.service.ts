import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) { }

    async createMessage(sender: string, recipient: string, text: string, conversationId: string): Promise<Message> {
        const newMessage = new this.messageModel({
            sender,
            recipient,
            text,
            conversation: conversationId,  // Associate the message with a conversation
            timestamp: new Date(),
        });

        return newMessage.save();
    }

    async getConversationMessages(conversationId: string): Promise<Message[]> {
        return this.messageModel.find({ conversation: conversationId }).exec();
    }
}
