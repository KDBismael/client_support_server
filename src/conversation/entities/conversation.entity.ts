import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
    // @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
    // participants: Types.ObjectId[];  // Array of user/admin IDs

    // @Prop({ type: Types.ObjectId, ref: 'Message' })
    // lastMessage: Types.ObjectId;

    @Prop({ type: String })
    title?: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);