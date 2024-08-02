import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { MessageDto } from './message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('send-message')
  sendMessage(@Body() messageDto: MessageDto, @Res() res: Response) {
    return this.appService.sendMessage(messageDto, res);
  }
}
