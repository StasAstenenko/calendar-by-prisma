'use client';

import { ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <input
      type='text'
      placeholder='Пошук за назвою...'
      value={searchTerm}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onSearchChange(e.target.value)
      }
      className='border rounded p-2 w-full'
    />
  );
};

export default SearchBar;
