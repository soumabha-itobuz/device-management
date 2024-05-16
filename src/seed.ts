import { PrismaClient, UserType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      phoneNo: faker.phone.number(),
      verificationToken: faker.string.uuid(),
      userType: UserType.CUSTOMER,
      roleId: faker.string.uuid(),
    },
  });
  await prisma.$disconnect();
}

main();
