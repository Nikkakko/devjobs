const { PrismaClient } = require('@prisma/client');
const data = require('../db/data.json');

const db = new PrismaClient();

async function main() {
  try {
    await db.Job.create({
      data: {
        id: '5f8d826b7c9a241c502dc8ef',
        userId: '5f8d826b7c9a241c502dc8ee',
        company: 'Blogr',
        logo: './assets/logos/blogr.svg',
        logoBackground: 'hsl(12, 79%, 52%)',
        position: 'Midweight Front-end Developer',
        contract: 'Full Time',
        location: 'United States',
        website: 'https://example.com/blogr',
        apply: 'https://example.com/blogr/apply',
        description:
          'We’re looking for a Frontend Developer who values user experience, performance and accessibility. Through our enduring interest in how people use our products, Blogr embraces a model of software development that is iterative and gradual. Like high-performance engines, our products are built through a process of continuous refinement (usually on two week release cycles). We’re looking for someone who is comfortable embodying this approach.',
      },

      requirements: {
        content:
          'You will be responsible for developing interactive and responsive user interface components using React concepts and workflows such as Redux, Flux, and Webpack. You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.',

        items: [
          'Previous experience working as a Frontend Developer',
          'React, Redux, Flux and Webpack',
          'Previous experience working with a remote team',
          'Experience with a version control system (Git)',
        ],
      },

      role: {
        content: 'Develop new user-facing features',
        items: [
          'Build reusable code and libraries for future use',
          'Ensure the technical feasibility of UI/UX designs',
          'Optimize application for maximum speed and scalability',
          'Assure that all user input is validated before submitting to back-end',
        ],
      },
    });
  } catch (error) {
    console.log(error, 'error seeding default categories');
  } finally {
    await db.$disconnect();
  }

  console.log('Default categories seeded');
}

main();
