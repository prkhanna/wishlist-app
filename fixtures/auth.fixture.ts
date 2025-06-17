import { test as base, expect } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: any;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page, request }, use) => {
    // Get authentication token
    const response = await request.post('https://auth.gowish.com/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        username: process.env.PLAYWRIGHT_USERNAME || 'qa.test@gmail.com',
        password: process.env.PLAYWRIGHT_PASSWORD || 'qa@123',
        grant_type: 'password',
        client_id: 'web'
      }
    });
    
    expect(response.status()).toBe(200);
    const token = await response.json();
    
    // Set the token in localStorage
    await page.goto('/');
    await page.getByRole('button', { name: 'Accepter alle' }).click();
    await page.evaluate((authToken) => {
      localStorage.setItem('token', authToken);
    }, token.id_token);
    
    await use(page);
  }
});

export { expect } from '@playwright/test';