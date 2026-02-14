import { test, expect } from '@playwright/test';
import { DriverFactory } from '../../src/core/drivers/driver.factory.js';

test.describe('API Smoke Tests', () => {
  let driver;

  test.beforeAll(async () => {
    driver = DriverFactory.create('api');
    await driver.initialize({
      apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    });
  });

  test.afterAll(async () => {
    await driver.terminate();
  });

  test('should fetch posts', async () => {
    const response = await driver.get('/posts/1');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeDefined();
  });

  test('should create a new post', async () => {
    const response = await driver.post('/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('foo');
  });
});
