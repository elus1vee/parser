import { SearchSeviceI } from './i-people.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('accounts')
export class SearchControllerI {
  constructor(private peopleService: SearchSeviceI) {}

  @Get(':filter')
  async findByName(@Param() params: any): Promise<any> {
    await this.peopleService.login('username', 'password');
    return this.peopleService.findByFilter(params.filter);
  }
}
