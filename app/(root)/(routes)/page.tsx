import JobCard from '@/components/JobCard';

import SearchInput from '@/components/SearchInput';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

interface Props {
  searchParams: {
    company: string;
    contract: string;
    location: string;
    take: string;
    skip: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { userId } = auth();

  const jobs = await prismadb.job.findMany({
    where: {
      company: {
        contains: searchParams.company,
        mode: 'insensitive',
      },
      contract: {
        contains: searchParams.contract,
        mode: 'insensitive',
      },
      location: {
        contains: searchParams.location,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='h-full p-4 space-y-2'>
      {!userId && (
        <p className='text-center text-gray-500 '>
          <span className='text-blue-500'>Login</span> to post a job or apply
          for one
        </p>
      )}

      <SearchInput />

      <div className='grid pt-8 gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}

        {jobs.length === 0 && (
          <p className='text-center text-gray-500 col-span-full'>
            No jobs found
          </p>
        )}
      </div>

      {jobs.length > 0 && jobs.length && (
        <p className='text-center text-gray-500'>
          Showing all {jobs.length} jobs
        </p>
      )}
    </div>
  );
}
