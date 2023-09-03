'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import moment from 'moment';
import { JobProps } from '@/types';
import Image from 'next/image';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pencil } from 'lucide-react';

const JobDetails = ({ job }: JobProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  const dateCreated = moment(job?.createdAt).fromNow();

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex items-center justify-between'>
        <ArrowLeft
          className='cursor-pointer 
            hover:scale-105 transform transition-all duration-200
            text-muted-foreground
          '
          onClick={() => router.back()}
        />

        {userId === job?.userId && (
          <Pencil
            className='cursor-pointer 
            hover:scale-105 transform transition-all duration-200
            text-muted-foreground
          '
            onClick={() => router.push(`/jobs/new/${job?.id}`)}
          />
        )}
      </div>
      <Card className='flex flex-col md:flex-row md:justify-between md:items-center'>
        <CardHeader className='flex flex-row space-x-4'>
          <div
            className=' w-12 h-12 rounded-full flex items-center justify-center'
            style={{ backgroundColor: job?.logoBackground }}
          >
            <Image
              src={job?.logo as string}
              alt='logo'
              width={30}
              height={30}
            />
          </div>
          <div className='flex flex-col'>
            <CardTitle>{job?.company}</CardTitle>
            <CardDescription>{job?.website}</CardDescription>
            <CardDescription>
              Created By {job?.userName || 'unknown'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link href={job?.website as string}>Company Site</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className='flex flex-col '>
        <CardHeader className='flex flex-col md:flex-row md:justify-between w-full '>
          <div className='flex flex-col'>
            <div className='flex items-center gap-x-2 '>
              <CardTitle className='text-sm font-light text-muted-foreground'>
                {dateCreated}
              </CardTitle>
              <div className='text-sm text-muted-foreground'>•</div>
              <CardDescription className='text-sm font-light'>
                {job?.contract}
              </CardDescription>
            </div>
            <CardTitle>{job?.position}</CardTitle>
          </div>

          <Button asChild>
            <Link href={job?.apply as string}>Apply</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <CardDescription>{job?.description}</CardDescription>

          <div className='flex flex-col gap-y-4  mt-4'>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>{job?.requirements?.content}</CardDescription>

            <ul className='list-disc list-item ml-6 space-y-2'>
              {job?.requirements?.items.map((item, index) => (
                <li
                  key={index}
                  className='text-sm font-light text-muted-foreground'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-y-4  mt-4'>
            <CardTitle>What You Will Do</CardTitle>
            <CardDescription>{job?.role?.content}</CardDescription>

            <ul className='list-decimal ml-6 space-y-2'>
              {job?.role?.items.map((item, index) => (
                <li
                  key={index}
                  className='text-sm font-light text-muted-foreground'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
