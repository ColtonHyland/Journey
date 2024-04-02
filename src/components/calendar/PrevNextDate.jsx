import React from 'react';
import Link from 'next/link';
import { format, addDays, subDays, parseISO } from 'date-fns';

export default function PrevNextDate({ date }) {

  const parsedDate = parseISO(date);
  const prevDate = format(subDays(parsedDate, 1), 'yyyy-MM-dd');
  const nextDate = format(addDays(parsedDate, 1), 'yyyy-MM-dd');

  return (
    <div>
      <Link href={`/schedule/${prevDate}`}>Previous</Link>
      <span> | </span>
      <Link href={`/schedule/${nextDate}`}>Next</Link>
    </div>
  );
}