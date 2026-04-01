import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  async getFlashMessage() {
    return this.page.locator('#flash').textContent();
  }

  async expectSuccessMessage() {
    await expect(this.page.locator('#flash')).toContainText('You logged into a secure area');
  }

  async expectErrorMessage() {
    await expect(this.page.locator('#flash')).toContainText('Your username is invalid');
  }
}