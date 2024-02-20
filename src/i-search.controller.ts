import { SearchSeviceI } from './i-search.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('accounts')
export class SearchControllerI {
  constructor(private peopleService: SearchSeviceI) {}

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

  @Get(':filter')
  async findByName(@Param() params: any): Promise<any> {
    return this.peopleService.findByFilter(params.filter);
  }
}
