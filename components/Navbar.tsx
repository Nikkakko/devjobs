import React from 'react';
import { ModeToggle } from './theme-toggle';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  const { user } = auth();
  return (
    <div className='bg-background h-[4rem] p-4 w-full flex justify-between items-center'>
      <Link href='/' className='flex items-center space-x-2 cursor-pointer'>
        <h2 className=' text-xl font-bold '>devjobs</h2>
      </Link>

      <div className='flex space-x-4 items-center'>
        <ModeToggle />

        {user !== null && (
          <Button asChild>
            <Link href='/jobs/new'>Post a Job</Link>
          </Button>
        )}

        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
