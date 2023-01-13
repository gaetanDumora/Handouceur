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

export const findUserByEmail = async (input: isUserInput) => {
  const { email } = input;
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true },
  });
};
