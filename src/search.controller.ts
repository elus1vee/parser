import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchSevice } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private peopleService: SearchSevice) {}

  @Get('/people/:name')
  async findPeople(@Param() params: any): Promise<any> {
    return this.peopleService.findPeople(params.name);
  }
  @Get('/group/:name')
  async findGroup(@Param() params: any): Promise<any> {
    return this.peopleService.findGroup(params.name);
  }
  @Post('/auth')
  async auth(@Body() credentials: any): Promise<any> {
    const { username, password } = credentials;
    try {
      await this.peopleService.login(username, password);
    } catch (error) {
      throw new Error('Authentication Error: ' + error.message);
    }
    return { success: true, message: 'Successful authentication' };
  }
}
