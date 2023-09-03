import JobDetails from '@/components/JobDetails';
import prismadb from '@/lib/prismadb';
import { JobProps } from '@/types';
import { Prisma } from '@prisma/client';

type Props = {
  params: {
    id: Prisma.JobWhereUniqueInput['id'];
  };
};

const JobPage = async ({ params }: Props) => {
  const job = (await prismadb.job.findUnique({
    where: {
      id: params.id,
    },
  })) as JobProps['job'];

  return <JobDetails job={job} />;
};

export default JobPage;
