import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';

@Injectable()
export class SearchSevice {
  private page: Page;
  async findPeople(username: string) {
    const usernameArray = username.split('-');
    const formattedKeywords =
      usernameArray.length > 1 ? usernameArray.join('%20') : usernameArray[0];

    const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${formattedKeywords}`;

    await this.page.goto(searchUrl);
    await this.page.waitForSelector(
      '.entity-result__title-text>a>span>span:first-child',
      { timeout: 5000 },
    );

    const results = await this.page.evaluate(() => {
      const usersArray = [];
      const usersNames = document.querySelectorAll(
        '.entity-result__title-text>a>span>span:first-child',
      );
      const imgLinks = document.querySelectorAll(
        '.entity-result__universal-image > div > a > div > div > div',
      );
      const linkedinLinks = document.querySelectorAll(
        '.entity-result__title-text>a',
      );

      usersNames.forEach((username, index) => {
        const user = {
          username: username.textContent,
          imgLink:
            imgLinks[index]?.children[0].getAttribute('src') || undefined,
          linkedinLink: linkedinLinks[index].getAttribute('href'),
        };
        usersArray.push(user);
      });
      return usersArray;
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
  async findGroup(group: string) {
    const groupArray = group.split('-');
    const formattedKeywords =
      groupArray.length > 1 ? groupArray.join('%20') : groupArray[0];

    const searchUrl = `https://www.linkedin.com/search/results/groups/?keywords=${formattedKeywords}`;

    await this.page.goto(searchUrl);
    await this.page.waitForSelector('.entity-result__title-text > a', {
      timeout: 5000,
    });
    const results = await this.page.evaluate(() => {
      const groupArray = [];
      const groupNames = document.querySelectorAll(
        '.entity-result__title-text>a',
      );
      const imgLinks = document.querySelectorAll(
        '.entity-result__universal-image>div>a>div>div',
      );

      groupNames.forEach((name, index) => {
        const group = {
          groupName: name.textContent.trim().replace(/\s+/g, ' '),
          imgLink:
            imgLinks[index]?.children[0].getAttribute('src') || undefined,
          linkedinLink: name.getAttribute('href'),
        };
        groupArray.push(group);
      });
      return groupArray;
    });
    return results;
  }
}