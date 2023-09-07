'use client';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { Checkbox } from './ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Separator } from './ui/separator';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const contract = searchParams.get('contract');
  const company = searchParams.get('company');
  const locationParam = searchParams.get('location');

  const debouncedValue = useDebounce(value, 500);
  const locationDebouncedValue = useDebounce(location, 500);

  useEffect(() => {
    const query = {
      company: debouncedValue,
      location: locationDebouncedValue,
      contract: isCheckboxChecked ? 'Full Time' : null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debouncedValue, locationDebouncedValue, isCheckboxChecked, router]);

  return (
    <div className='relative w-full flex items-center justify-between bg-background rounded-sm shadow-md px-2'>
      <div className='flex items-center '>
        <Search />
        <Input
          placeholder='Filter by company,position...'
          className=' border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <Separator className='hidden md:block' orientation='vertical' />

      <div className='hidden md:flex items-center '>
        <MapPin />
        <Input
          placeholder='Filter by location...'
          className=' border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      <div className='hidden  md:flex items-center gap-2'>
        <Checkbox
          checked={isCheckboxChecked}
          onCheckedChange={(checked: boolean) => setIsCheckboxChecked(checked)}
        />
        <label className='text-sm text-gray-500'>Full Time Only</label>
      </div>
    </div>
  );
};

export default SearchInput;
