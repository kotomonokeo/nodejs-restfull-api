import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};
bcrypt
const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export {
  removeTestUser,
  createTestUser
}