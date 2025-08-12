'use client';

import { ChangeEvent } from 'react';

interface ImportanceFilterProps {
  importance: string;
  onImportanceChange: (value: string) => void;
}

const ImportanceFilter = ({
  importance,
  onImportanceChange,
}: ImportanceFilterProps) => {
  return (
    <select
      value={importance}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onImportanceChange(e.target.value)
      }
      className='border rounded p-2 w-full'
    >
      <option value=''>Усі важливості</option>
      <option value='low'>Низька</option>
      <option value='medium'>Середня</option>
      <option value='high'>Висока</option>
    </select>
  );
};

export default ImportanceFilter;
