//changes the page to for example yesterday or tomorrow, or last month and next month, with the help of two arrow bottons

import React from 'react';
import Link from 'next/link';

export default function PrevNextView({ date, prev, next }) {
  return (
    <div>
      <Link href={`/schedule/${prev}`}>Previous</Link>
      <span> | </span>
      <Link href={`/schedule/${next}`}>Next</Link>
    </div>
  );
}