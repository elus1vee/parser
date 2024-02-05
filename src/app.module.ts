import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports: [],
  controllers: [AppController, PeopleController],
  providers: [AppService, PeopleService],
})
export class AppModule {}
