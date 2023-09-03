import SearchInput from '@/components/SearchInput';
import prismadb from '@/lib/prismadb';

export default async function Home() {
  // const jobs = await prismadb.job.findMany();

  // console.log(jobs);

  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput />

      <div className='flex flex-col space-y-2'></div>
    </div>
  );
}
