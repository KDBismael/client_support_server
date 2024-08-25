import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot('mongodb://localhost:27017/clientSupport'), TicketModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
