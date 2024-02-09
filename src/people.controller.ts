import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get(':name')
  async findByName(@Param() params: any): Promise<any> {
    await this.peopleService.login('sasha432301@gmail.com', '1357908642');
    return this.peopleService.findByName('Александр-Волк');
  }
  @Get('/group/:name')
  async findGroup(@Param() params: any): Promise<any> {
    await this.peopleService.login('sasha432301@gmail.com', '1357908642');
    return this.peopleService.findGroup(params.name);
  }
}
