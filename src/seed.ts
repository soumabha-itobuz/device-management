import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = 10;
  const assets = 3;
  const saltRounds = 10; // bcrypt salt rounds for hashing

  // Create multiple users and assets
  for (let i = 0; i < users; i++) {
    const password = 'password123'; // Default password for seed data
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password

    // Create a user with a hashed password
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        team: faker.company.name(),
        password: hashedPassword, // Save the hashed password
      },
    });

    // Create 3 assets for each user
    for (let j = 0; j < assets; j++) {
      await prisma.asset.create({
        data: {
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          assignee_id: user.id, // Reference the user ID
          assignee: user.name,
          created_by: faker.person.fullName(),
          asset_type: faker.commerce.department(),
          attachment: faker.image.url(),
          status: 'active', // Default status for assets
        },
      });
    }
  }

  console.log('Seed data inserted successfully');
}

// Disconnect the Prisma Client
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
