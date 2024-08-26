import { Types } from "mongoose";

export class CreateTicketDto {
    username: string;
    email: string;
    description: string;
    conversationId: Types.ObjectId;
    status: string;
}
