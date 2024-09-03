import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MessageDto } from './message.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  sendMessage(body: MessageDto, res: Response) {
    let ticketCreation = {
      userName: '',
      email: '',
      description: '',
    }

    switch (body.eventType) {
      case "contact support":
        return res.status(HttpStatus.OK).send({ sucess: true, message: "Entrez votre nom s'il vous plaît", haveFeedBack: false });
      case "username":
        ticketCreation.userName = body.message;
        return res.status(HttpStatus.OK).send({ sucess: true, message: "Entrez votre email s'il vous plaît", haveFeedBack: false });
      case "email":
        ticketCreation.email = body.message;
        return res.status(HttpStatus.OK).send({ sucess: true, message: "Veillez entrez une description claire du problème que vous rencontrez", haveFeedBack: false });
      case "description":
        ticketCreation.description = body.message;
        return res.status(HttpStatus.OK).send({ sucess: true, message: "Voulez vous Confirmer la creation du ticket?", haveFeedBack: false });
      default:
        return res.status(HttpStatus.OK).send({ sucess: true, message: "A message from our AI model", haveFeedBack: true });
    }
  }
}
