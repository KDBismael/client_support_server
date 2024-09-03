import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from 'src/conversation/conversation.service';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private messagesService: MessagesService,
    private conversationsService: ConversationService
  ) { }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.broadcast.emit('userConnected', { id: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    client.broadcast.emit('userDisconnected', { id: client.id });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: { conversationId: string; sender: string; recipient: string; text: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log('Message received:', message);
    const savedMessage = await this.messagesService.createMessage(
      message.sender,
      message.recipient,
      message.text,
      message.conversationId,  // Pass the conversation ID
    );

    // Emit the message to both the sender and the recipient
    this.server.to(client.id).emit('receiveMessage', savedMessage);
    console.log('Emitting message:', savedMessage);
    // Notify all connected admins about the new message
    // this.server.emit('receiveMessage', savedMessage);
  }

  @SubscribeMessage('getConversation')
  async getConversationMessages(
    @MessageBody() data: { ticketId: string, conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const conversation = await this.conversationsService.findOrCreateConversation(data.conversationId, data.ticketId);
    const messages = await this.messagesService.getConversationMessages(conversation._id.toString());

    client.emit('conversationHistory', {
      conversationId: conversation._id,
      messages,
    });
    console.log('Emitting conversation history:', messages);
  }

  @SubscribeMessage('loadConversationById')
  async loadConversationBySlug(
    @MessageBody() data: { consversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const conversation = await this.conversationsService.findOrCreateConversation(data.consversationId, '');
    const messages = await this.messagesService.getConversationMessages(conversation._id);

    client.emit('conversationHistory', messages);
    console.log('Emitting conversation history:', messages);
  }
}