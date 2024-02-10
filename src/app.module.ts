import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleInstaController } from './i-people.controller';
import { PeopleInstaService } from './i-people.service';

@Module({
  imports: [],
  controllers: [AppController, PeopleController, PeopleInstaController],
  providers: [AppService, PeopleService, PeopleInstaService],
})
export class AppModule {}
