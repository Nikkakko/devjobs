'use client';
import { Input } from './ui/input';
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const debouncedValue = useDebounce(value, 500);
  return (
    <div className='relative w-full flex items-center justify-between bg-background rounded-sm shadow-md px-2'>
      <div className='flex items-center '>
        <Search />
        <Input
          placeholder='Filter by title, companies, expertise...'
          className=' border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

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

      <div className='flex justify-end'>
        <Button size='sm'>Search</Button>
      </div>
    </div>
  );
};

export default SearchInput;
