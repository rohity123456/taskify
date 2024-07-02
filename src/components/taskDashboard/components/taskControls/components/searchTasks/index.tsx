'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || ''; // Get initial query from URL

  const [query, setQuery] = useState(currentQuery);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams); // Copy existing params

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    router.push(`/?${params}`); // Update URL with search query
  };

  return (
    <form onSubmit={handleSearch} className='flex items-center space-x-2'>
      <Input
        type='text'
        placeholder='Search by name, description, status, priority...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full'
      />
    </form>
  );
}
