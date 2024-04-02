//changes the page to for example yesterday or tomorrow, or last month and next month, with the help of two arrow bottons

import React from 'react';
import Link from 'next/link';
import { format, addDays, subDays, parseISO } from 'date-fns';

export default function PrevNextDate({ date }) {

  console.log('Original date:', date);

  const parsedDate = parseISO(date);
  console.log('Parsed date:', parsedDate);

  const prevDate = format(subDays(parsedDate, 1), 'yyyy-MM-dd');
  console.log('Previous date:', prevDate);

  const nextDate = format(addDays(parsedDate, 1), 'yyyy-MM-dd');
  console.log('Next date:', nextDate);


  return (
    <div>
      <Link href={`/schedule/${prevDate}`}>Previous</Link>
      <span> | </span>
      <Link href={`/schedule/${nextDate}`}>Next</Link>
    </div>
  );
}