'use server';
import { revalidatePath } from 'next/cache';
import prismadb from './prismadb';

export const fetchJobs = async (take: number, skip: number) => {
  const jobs = await prismadb.job.findMany({
    take,
    skip,
    orderBy: {
      createdAt: 'desc',
    },
  });

  revalidatePath('/');

  return jobs;
};
