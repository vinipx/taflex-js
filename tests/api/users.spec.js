import { test, expect } from "../fixtures.js";

test.describe("User API Tests", () => {
  test.use({ mode: "api" });

  test("should fetch user details", async ({ driver }) => {
    const response = await driver.get("/users/1");
    expect(response.ok()).toBeTruthy();

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.username).toBe("Bret");
  });
});
