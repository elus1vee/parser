import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search.controller';
import { SearchSevice } from './search.service';

@Module({
  imports: [],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchSevice],
})
export class AppModule {}
