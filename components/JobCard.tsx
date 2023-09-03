'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Job, Prisma } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  job: Job & {};
};

const JobCard = ({ job }: Props) => {
  const {
    company,
    logo,
    logoBackground,
    position,
    contract,
    location,
    createdAt,
  } = job;
  const router = useRouter();

  const dateCreated = moment(createdAt).fromNow();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <Card
      className='relative shadow-md cursor-pointer
    hover:scale-105 transform transition-all duration-200
    '
      onClick={handleClick}
    >
      <div
        className='absolute w-12 h-12 rounded-full -top-6 right-2 flex items-center justify-center'
        style={{ backgroundColor: logoBackground }}
      >
        <Image src={logo} alt={company} width={30} height={30} />
      </div>

      <CardHeader className=''>
        <CardTitle className='text-lg font-bold'>{company}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardTitle className='text-md font-bold'>{position}</CardTitle>
        <CardDescription className='text-sm'>{contract}</CardDescription>
      </CardContent>

      <CardFooter className='flex justify-between'>
        <CardDescription className='text-sm text-indigo-500 '>
          {location}
        </CardDescription>
        <CardDescription className='text-sm'>{dateCreated}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
