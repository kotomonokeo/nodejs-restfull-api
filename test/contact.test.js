import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  createTestUser,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create new contacts", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        last_name: "test",
        email: "test@gmail.com",
        phone: "0857123456789",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("0857123456789");
  });

  it("should reject create new contacts if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        last_name: "test",
        email: "test@gmail.com",
        phone: "0857123456789",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
