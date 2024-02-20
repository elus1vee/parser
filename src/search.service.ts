import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';

@Injectable()
export class SearchSevice {
  private page: Page;
  private browser: any;

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
    // await this.page.waitForNavigation({
    //   waitUntil: 'domcontentloaded',
    // });

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
          name: username.textContent,
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
    this.browser = await puppeteer.launch({
      headless: false,
    });
    this.page = await this.browser.newPage();
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
          name: name.textContent.trim().replace(/\s+/g, ' '),
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
  async message(targetUsername: string, message: string) {
    await this.page.goto('https://www.linkedin.com/messaging');
    await this.page.waitForSelector(
      '.msg-conversation-listitem__participant-names',
      {
        timeout: 5000,
      },
    );

    const userElements = await this.page.$$(
      '.msg-conversation-listitem__participant-names',
    );
    const linkElements = await this.page.$$('.msg-conversation-listitem__link');

    for (let i = 0; i < userElements.length; i++) {
      const userElement = userElements[i];
      const linkElement = linkElements[i];

      const username = await this.page.evaluate(
        (user) => user.textContent.trim().replace(/\s+/g, ' '),
        userElement,
      );

      if (username === targetUsername) {
        const link = await this.page.evaluate(
          (links) => links.getAttribute('href'),
          linkElement,
        );
        await this.page.goto(`https://www.linkedin.com/${link}`);
        await this.page.waitForSelector('.msg-form__contenteditable');
        await this.page.type('.msg-form__contenteditable', message);
        await this.page.waitForFunction(() => {
          const button = document.querySelector(
            '.msg-form__send-button',
          ) as HTMLButtonElement;
          return !button.disabled;
        });
        await this.page.click('.msg-form__send-button');
        break;
      }
    }
  }
}
