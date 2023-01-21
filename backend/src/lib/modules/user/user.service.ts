import { hashPassword } from '../../utils/hash.js';
import prisma from '../../utils/prisma.js';
import { CreateUserInput, isUserInput } from './user.shema.js';

export const createUser = async (input: CreateUserInput) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  return await prisma.user.create({
    data: {
      password: hash,
      salt,
      ...rest,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      admin: true,
    },
  });
};

export const isAdmin = async (email: string) => {
  const user = await findUserByEmail(email);
  return user?.admin;
};
