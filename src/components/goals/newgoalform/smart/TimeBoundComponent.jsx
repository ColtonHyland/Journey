import React from 'react';

const TimeBoundComponent = ({ timeBound, setTimeBound }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700">Time-bound</h3>
      <label htmlFor="timeBoundWhen" className="block text-sm font-medium text-gray-700">When?</label>
      <textarea id="timeBoundWhen" value={timeBound.when} onChange={(e) => setTimeBound({ ...timeBound, when: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="timeBoundSixMonths" className="block text-sm font-medium text-gray-700">What can I do six months from now?</label>
      <textarea id="timeBoundSixMonths" value={timeBound.sixMonths} onChange={(e) => setTimeBound({ ...timeBound, sixMonths: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="timeBoundSixWeeks" className="block text-sm font-medium text-gray-700">What can I do six weeks from now?</label>
      <textarea id="timeBoundSixWeeks" value={timeBound.sixWeeks} onChange={(e) => setTimeBound({ ...timeBound, sixWeeks: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="timeBoundToday" className="block text-sm font-medium text-gray-700">What can I do today?</label>
      <textarea id="timeBoundToday" value={timeBound.today} onChange={(e) => setTimeBound({ ...timeBound, today: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
    </div>
  );
};

export default TimeBoundComponent;
