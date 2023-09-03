import JobCard from '@/components/JobCard';
import SearchInput from '@/components/SearchInput';
import prismadb from '@/lib/prismadb';

export default async function Home() {
  const jobs = await prismadb.job.findMany();

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />

      <div className='grid pt-8 gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
