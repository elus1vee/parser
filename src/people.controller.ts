import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get(':name')
  async findByName(@Param() params: any): Promise<any> {
    await this.peopleService.login('elus1v1xxx@gmail.com', 'Saxar2003');
    return this.peopleService.findByName('aliaksandr');
  }
  @Get('/group/:name')
  async findGroup(@Param() params: any): Promise<any> {
    await this.peopleService.login('elus1v1xxx@gmail.com', 'Saxar2003');
    return this.peopleService.findGroup(params.name);
  }
}
