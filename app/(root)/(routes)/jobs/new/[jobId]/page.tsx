import JobsForm from '@/components/JobsForm';
import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

interface Props {
  params: {
    jobId: string;
  };
}

const JobsPage = async ({ params: { jobId } }: Props) => {
  const { userId } = auth();

  const job = await prismadb.job.findUnique({
    where: {
      id: jobId,
      userId: userId as string,
    },
  });

  if (!userId) {
    return redirectToSignIn();
  }

  return <JobsForm initialData={job} />;
};

export default JobsPage;
