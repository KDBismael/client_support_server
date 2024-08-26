import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ConversationService } from './conversation/conversation.service';
import { EmailService, SucessEmailI } from './email/email.service';
import { MessageDto } from './message.dto';
import { MessagesService } from './messages/messages.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
    private readonly conversationsService: ConversationService,
    private readonly messagesService: MessagesService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('send-message')
  sendMessage(@Body() messageDto: MessageDto, @Res() res: Response) {
    return this.appService.sendMessage(messageDto, res);
  }
  @Post('send-email')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('html') html?: string,
  ): Promise<SucessEmailI> {
    const res = await this.emailService.sendMail(to, subject, text, html);
    return res;
  }
}
