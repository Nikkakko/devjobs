import Navbar from '@/components/Navbar';
import React from 'react';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar />
      {/* <div className='hidden md:flex mt-16 w-20 flex-col fixed inset-y-0'>
      </div> */}
      <main className='mx-auto container p-16 md:p-20 h-full'>{children}</main>
    </div>
  );
};

export default RootLayout;
