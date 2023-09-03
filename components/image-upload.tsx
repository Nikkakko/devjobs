'use client';

import React from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
interface Props {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled = false }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='sapce-y-4  flex flex-col justify-center items-center bg-background'>
      <CldUploadButton
        onUpload={(result: any) => {
          onChange(result.info.secure_url);
        }}
        options={{
          maxFiles: 1,
        }}
        uploadPreset='devjobs'
      >
        <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center'>
          <div className='relative h-40 w-40'>
            <Image
              fill
              alt='Upload'
              src={value || '/placeholder.svg'}
              className='rounded-lg object-contain'
              priority
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
