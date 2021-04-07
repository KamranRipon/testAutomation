import {Page} from 'playwright';

/**
 * Helper class
 */
export class BasePage {
  page: Page;
  /**
   * A
   * @param {Page} page Playwright page
   */
  constructor(page: Page) {
    this.page = page;
  }
}
