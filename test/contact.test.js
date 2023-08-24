import supertest from "supertest";
import { web } from "../src/application/web.js";
import {
  createContactTest,
  createTestUser,
  getTestContact,
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
        phone: "123456789",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("123456789");
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

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createContactTest();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.last_name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phone).toBe("123456789");
  });

  it("should reject get contact if request invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "asd");

    expect(result.status).toBe(401);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createContactTest();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "koto",
        last_name: "mono",
        email: "koto@gmail.com",
        phone: "234234234",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.first_name).toBe("koto");
    expect(result.body.data.last_name).toBe("mono");
    expect(result.body.data.email).toBe("koto@gmail.com");
    expect(result.body.data.phone).toBe("234234234");
  });

  it("should reject update if request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "mono",
        email: "koto",
        phone: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject update if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "koto",
        last_name: "mono",
        email: "koto@gmail.com",
        phone: "234234234",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createContactTest();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBeNull()
  });

  it("should reject delete contact if contact is not exist", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
