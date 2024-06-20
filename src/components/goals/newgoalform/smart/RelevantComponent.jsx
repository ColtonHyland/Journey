import React from 'react';

const RelevantComponent = ({ relevant, setRelevant }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700">Relevant</h3>
      <label htmlFor="relevantWorthwhile" className="block text-sm font-medium text-gray-700">Does this seem worthwhile?</label>
      <textarea id="relevantWorthwhile" value={relevant.worthwhile} onChange={(e) => setRelevant({ ...relevant, worthwhile: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="relevantRightTime" className="block text-sm font-medium text-gray-700">Is this the right time?</label>
      <textarea id="relevantRightTime" value={relevant.rightTime} onChange={(e) => setRelevant({ ...relevant, rightTime: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="relevantMatches" className="block text-sm font-medium text-gray-700">Does this match our other efforts/needs?</label>
      <textarea id="relevantMatches" value={relevant.matches} onChange={(e) => setRelevant({ ...relevant, matches: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="relevantRightPerson" className="block text-sm font-medium text-gray-700">Am I the right person to reach this goal?</label>
      <textarea id="relevantRightPerson" value={relevant.rightPerson} onChange={(e) => setRelevant({ ...relevant, rightPerson: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="relevantApplicable" className="block text-sm font-medium text-gray-700">Is it applicable in the current socio-economic environment?</label>
      <textarea id="relevantApplicable" value={relevant.applicable} onChange={(e) => setRelevant({ ...relevant, applicable: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
    </div>
  );
};

export default RelevantComponent;
