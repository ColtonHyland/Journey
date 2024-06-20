import React from 'react';

const MeasurableComponent = ({ measurable, setMeasurable }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700">Measurable</h3>
      <label htmlFor="measurableHowMuch" className="block text-sm font-medium text-gray-700">How much?</label>
      <textarea id="measurableHowMuch" value={measurable.howMuch} onChange={(e) => setMeasurable({ ...measurable, howMuch: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="measurableHowMany" className="block text-sm font-medium text-gray-700">How many?</label>
      <textarea id="measurableHowMany" value={measurable.howMany} onChange={(e) => setMeasurable({ ...measurable, howMany: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="measurableAccomplishment" className="block text-sm font-medium text-gray-700">How will I know when it is accomplished?</label>
      <textarea id="measurableAccomplishment" value={measurable.accomplishment} onChange={(e) => setMeasurable({ ...measurable, accomplishment: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
    </div>
  );
};

export default MeasurableComponent;
