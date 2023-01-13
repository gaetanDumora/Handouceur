import prisma from '../src/lib/utils/prisma';

async function main() {
  return await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: '12345',
      salt: '12345',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
