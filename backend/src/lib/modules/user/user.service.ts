import { hashPassword } from "../../utils/hash.js";
import prisma from "../../utils/prisma.js";
import { CreateUserInput, LoginInput } from "./user.shema.js";

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: {
      password: hash,
      salt,
      ...rest,
    },
  });

  return user;
};

export const findUserByEmail = async (input: Pick<LoginInput, "email">) => {
  const { email } = input;
  const maybeUser = await prisma.user.findFirst({ where: { email } });
  return maybeUser;
};
