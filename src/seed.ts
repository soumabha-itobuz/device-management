import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

const prisma = new PrismaClient();

async function main() {
  // A
  for (const d of ['INTEREST', 'SKILLS', 'DEPARTMENT']) {
    console.log('adding custom fields data types of ', d);
    const departments: any = [];
    _.range(0, 10).forEach(() => {
      departments.push({
        type: 'INTEREST',
        title: faker.commerce.department(),
      });
    });

    await prisma.customFields.createMany({ data: departments });
    console.log('added custom fields data types of ', d);
  }

  // 

  //
}

main();
