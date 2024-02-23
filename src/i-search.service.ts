import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

@Injectable()
export class SearchSeviceI {
  private browser: Browser;
  private page: Page;

  constructor() {}

  async sendMessage(account: string, message: string) {
    let allMessagesSent = true;

    try {
      await this.page.goto(`https://www.instagram.com/${account}/`);
      await this.page.waitForSelector(
        '.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1i64zmx.x1n2onr6.x6ikm8r.x10wlt62.x1iyjqo2.x2lwn1j.xeuugli.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1',
      );
      await this.page.click(
        '.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1i64zmx.x1n2onr6.x6ikm8r.x10wlt62.x1iyjqo2.x2lwn1j.xeuugli.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1',
      );

      const searchResultSelector = '._a9--._ap36._a9_1';
      await this.page.waitForSelector(searchResultSelector);
      const searchResultElement = await this.page.$(searchResultSelector);
      if (searchResultElement !== null) {
        await this.page.click(searchResultSelector);
      }

      await this.page.waitForSelector('[aria-label="Message"]');

      const message_input = await this.page.$('[aria-label="Message"]');
      await message_input.type(message);

      await this.page.keyboard.press('Enter');
    } catch (error) {
      console.error(`Error sending message to account ${account}: ${error}`);
      allMessagesSent = false;
    }

    return allMessagesSent ? 'Message sent' : 'Error sending message';
  }

  async findByFilter(filter: string) {
    const searchUrl = 'https://www.instagram.com/';
    await this.page.goto(searchUrl);

    const searchResultSelector = '._a9-z ._a9_1';
    const searchResultElement = await this.page.$(searchResultSelector);
    if (searchResultElement !== null) {
      await this.page.click(searchResultSelector);
    }

    await this.page.waitForSelector('[aria-describedby=":r4:"]');
    await this.page.click('[aria-describedby=":r4:"]');

    await this.page.waitForSelector(
      '.x1lugfcp.x19g9edo.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x5n08af.xl565be.x5yr21d.x1a2a7pz.xyqdw3p.x1pi30zi.xg8j3zb.x1swvt13.x1yc453h.xh8yej3.xhtitgo.xs3hnx8.x1dbmdqj.xoy4bel.x7xwk5j',
    );
    await this.page.type(
      '.x1lugfcp.x19g9edo.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x5n08af.xl565be.x5yr21d.x1a2a7pz.xyqdw3p.x1pi30zi.xg8j3zb.x1swvt13.x1yc453h.xh8yej3.xhtitgo.xs3hnx8.x1dbmdqj.xoy4bel.x7xwk5j',
      filter,
    );

    await this.page.waitForSelector(
      '.x6s0dn4.x78zum5.xdt5ytf.x5yr21d.x1odjw0f.x1n2onr6.xh8yej3 div a',
    );

    const results = await this.page.evaluate(() => {
      const searchResults = Array.from(
        document.querySelectorAll(
          '.x6s0dn4.x78zum5.xdt5ytf.x5yr21d.x1odjw0f.x1n2onr6.xh8yej3 div a',
        ),
      )
        .map((a) => {
          const href = a.getAttribute('href');
          if (href.includes('/explore/tags')) {
            return null;
          } else {
            return `https://www.instagram.com${href}`;
          }
        })
        .filter((a) => a !== null);

      const uniqueResults = [...new Set(searchResults)];
      return uniqueResults;
    });

    return results;
  }

  async login(username: string, password: string): Promise<any> {
    this.browser = await puppeteer.launch({
      headless: false,
    });
    this.page = await this.browser.newPage();
    await this.page.goto('https://www.instagram.com/accounts/login/');
    await this.page.waitForSelector('[name="username"]');
    await this.page.type('[name="username"]', username);
    await this.page.type('[name="password"]', password);
    await this.page.click('#loginForm div div button div');
    await this.page.waitForNavigation();
  }
}
