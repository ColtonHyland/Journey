import React from 'react';
import Link from 'next/link';
import { format, addDays, subDays, parseISO } from 'date-fns';

const DayScheduleNavigation = ({ date }) => {
  const formattedDate = format(parseISO(date), 'EEEE, MMMM do, yyyy');
  const prevDate = format(subDays(parseISO(date), 1), 'yyyy-MM-dd');
  const nextDate = format(addDays(parseISO(date), 1), 'yyyy-MM-dd');

  return (
    <>
      <div className="flex items-center justify-between p-4">
        {/* Previous button with left chevron */}
        <Link href={`/schedule/${prevDate}`} className="text-xl font-semibold hover:text-blue-500 transition-colors">
          &#9664;
        </Link>

        {/* Center section for the date */}
        <div>
          <h1 className="text-2xl font-bold">{formattedDate}</h1>
        </div>

        {/* Next button with right chevron */}
        <Link href={`/schedule/${nextDate}`} className="text-xl font-semibold hover:text-blue-500 transition-colors">
          &#9654;
        </Link>
      </div>
    </>
  );
};

export default DayScheduleNavigation;