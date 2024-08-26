import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ timestamps: true }) // Automatically add `createdAt` and `updatedAt` fields
export class Ticket {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Conversation' })
    conversationId: Types.ObjectId;

    @Prop({ default: "En attente" })
    status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
