import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PeopleService {
  private page: any;
  async findByName(username: string): Promise<any> {
    const usernameArray = username.split(' ');
    this.page.goto(
      `https://www.linkedin.com/search/results/people/?keywords=${usernameArray[0]}%20${usernameArray[1]}`,
    );
    await this.page.evaluate(() => {
      document.querySelectorAll('.entity-result__title-text');
    });
    return 'test';
  }
  async login(username: string, password: string): Promise<any> {
    const browser = await puppeteer.launch({
      headless: false,
    });
    this.page = await browser.newPage();
    await this.page.goto(
      `https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin`,
    );
    await this.page.type('#username', username);
    await this.page.type('#password', password);
    await this.page.click('.login__form_action_container button');
    await this.page.waitForNavigation();
  }
}
