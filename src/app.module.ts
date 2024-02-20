import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search.controller';
import { SearchSevice } from './search.service';
import { SearchControllerI } from './i-search.controller';
import { SearchSeviceI } from './i-search.service';

@Module({
  imports: [],
  controllers: [AppController, SearchController, SearchControllerI],
  providers: [AppService, SearchSevice, SearchSeviceI],
})
export class AppModule {}
