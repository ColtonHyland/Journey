import React from 'react';

const SpecificComponent = ({ specific, setSpecific }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700">Specific</h3>
      <label htmlFor="specificWhat" className="block text-sm font-medium text-gray-700">What do I want to achieve?</label>
      <textarea id="specificWhat" value={specific.what} onChange={(e) => setSpecific({ ...specific, what: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="specificWhy" className="block text-sm font-medium text-gray-700">Why is this goal important?</label>
      <textarea id="specificWhy" value={specific.why} onChange={(e) => setSpecific({ ...specific, why: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="specificWho" className="block text-sm font-medium text-gray-700">Who is involved?</label>
      <textarea id="specificWho" value={specific.who} onChange={(e) => setSpecific({ ...specific, who: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="specificWhere" className="block text-sm font-medium text-gray-700">Where is it located?</label>
      <textarea id="specificWhere" value={specific.where} onChange={(e) => setSpecific({ ...specific, where: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="specificResources" className="block text-sm font-medium text-gray-700">Which resources or limits are involved?</label>
      <textarea id="specificResources" value={specific.resources} onChange={(e) => setSpecific({ ...specific, resources: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
    </div>
  );
};

export default SpecificComponent;
