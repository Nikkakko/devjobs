import React from 'react';
import { ModeToggle } from './theme-toggle';
import { UserButton, auth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className='bg-background h-[4rem] p-4 w-full flex justify-between items-center'>
      <Link href='/' className='flex items-center space-x-2 cursor-pointer'>
        <h2 className=' text-xl font-bold '>devjobs</h2>
      </Link>

      <div className='flex space-x-4 items-center'>
        <ModeToggle />

        {userId ? (
          <Button asChild>
            <Link href='/jobs/new/5f4e60bfb76a3a28cc2b9183'>Post a Job</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href='/sign-in'>Login</Link>
          </Button>
        )}

        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
