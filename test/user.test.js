import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "admin",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "admin",
      password: "rahasia",
      name: "koto",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("koto");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "admin",
      password: "rahasia",
      name: "koto",
    });

    logger.info(result.body);
    
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.name).toBe("koto");

    result = await supertest(web).post("/api/users").send({
      username: "admin",
      password: "rahasia",
      name: "koto",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
