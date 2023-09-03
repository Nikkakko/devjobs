const { PrismaClient } = require('@prisma/client');
const data = require('../db/data.json');

const db = new PrismaClient();

async function main() {
  try {
    for (const jobData of data) {
      await db.job.create({
        data: {
          userId: 'user_2Uq4l6S2MLhyxLgus2NJ409YfHO',
          company: jobData.company,
          logo: jobData.logo,
          logoBackground: jobData.logoBackground,
          position: jobData.position,
          contract: jobData.contract,
          location: jobData.location,
          website: jobData.website,
          apply: jobData.apply,
          description: jobData.description,
          requirements: jobData.requirements,
          role: jobData.role,
        },
      });
    }
  } catch (error) {
    console.error('Error seeding job data:', error);
  } finally {
    await db.$disconnect();
  }

  console.log('Job data seeded');
}

main();
