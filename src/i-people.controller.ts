import { PeopleInstaService } from './i-people.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('accounts')
export class PeopleInstaController {
  constructor(private peopleService: PeopleInstaService) {}

  @Get(':filter')
  async findByName(@Param() params: any): Promise<any> {
    await this.peopleService.login('username', 'password');
    return this.peopleService.findByFilter(params.filter);
  }
}
