import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get(':name')
  async findByName(@Param() params: any): Promise<any> {
    await this.peopleService.login('username', 'password');
    return this.peopleService.findByName(params.name);
  }
}
