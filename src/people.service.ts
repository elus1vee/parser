import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PeopleService {
  private page: any;
  async findByName(username: string) {
    const usernameArray = username.split(' ');
    const formattedKeywords =
      usernameArray.length > 1 ? usernameArray.join('%20') : usernameArray[0];

    const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${formattedKeywords}`;

    await this.page.goto(searchUrl);
    await this.page.waitForNavigation();
    const results = await this.page.evaluate(() => {
      const values = [];
      document
        .querySelectorAll(
          '.entity-result__title-text > a > span > span:first-child',
        )
        .forEach((item) => {
          values.push(item.textContent);
        });
      return values;
    });
    return results;
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
