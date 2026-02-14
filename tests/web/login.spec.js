import { test, expect } from "../fixtures.js";

test.describe("Login Tests", () => {
  test("should login successfully with valid credentials @PROJ-456", async ({
    driver,
  }) => {
    await driver.navigateTo("https://the-internet.herokuapp.com/login");
    await driver.captureScreenshot("login_page_loaded");
    await driver.loadLocators("login");

    const username = await driver.findElement("username_field");
    const password = await driver.findElement("password_field");
    const loginButton = await driver.findElement("login_button");

    await username.fill("tomsmith");
    await password.fill("SuperSecretPassword!");
    await loginButton.click();

    const flashMessage = await driver.findElement("flash_message");
    const text = await flashMessage.getText();
    expect(text).toContain("You logged into a secure area!");
  });

  test(
    "should show error with invalid credentials",
    { tag: ["@PROJ-789"] },
    async ({ driver }) => {
      await driver.navigateTo("https://the-internet.herokuapp.com/login");
      await driver.loadLocators("login");

      await (await driver.findElement("username_field")).fill("invalid");
      await (await driver.findElement("password_field")).fill("invalid");
      await (await driver.findElement("login_button")).click();

      const flashMessage = await driver.findElement("flash_message");
      const text = await flashMessage.getText();
      expect(text).toContain("Your username is invalid!");
    },
  );
});
