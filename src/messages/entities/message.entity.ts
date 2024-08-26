import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: Types.ObjectId, required: true })
    sender: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true })
    recipient: Types.ObjectId;

    @Prop({ required: true })
    text: string;

    @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
    conversation: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    read: boolean;

    @Prop({ type: Date, default: Date.now })
    timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
