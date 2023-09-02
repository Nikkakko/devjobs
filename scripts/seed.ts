const { PrismaClient } = require('@prisma/client');
const data = require('../db/data.json');

const db = new PrismaClient();

async function main() {
  await db.Job.createMany({
    data: data,
  });

  try {
  } catch (error) {
    console.log(error, 'error seeding default categories');
  } finally {
    await db.$disconnect();
  }

  console.log('Default categories seeded');
}

main();
