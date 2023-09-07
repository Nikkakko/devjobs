'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import qs from 'query-string';
import { useSearchParams, useRouter } from 'next/navigation';

const LoadMore = () => {
  const [take, setTake] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = async (e: any) => {
    e.preventDefault();
    setTake(prevState => prevState + 10);
  };

  useEffect(() => {
    const query = {
      take,
      skip,
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
  }, [take, skip, router, searchParams]);

  return (
    <Button className='' variant='secondary' onClick={handleClick}>
      Load More
    </Button>
  );
};

export default LoadMore;
