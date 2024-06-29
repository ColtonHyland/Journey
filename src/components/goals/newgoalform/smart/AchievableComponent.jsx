import React, { useState } from 'react';

const AchievableComponent = ({ achievable, setAchievable }) => {
  const [quantifiers, setQuantifiers] = useState([{ label: '', value: 0 }]);

  const handleChange = (field, value) => {
    setAchievable((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuantifierChange = (index, field, value) => {
    const newQuantifiers = [...quantifiers];
    newQuantifiers[index][field] = value;
    setQuantifiers(newQuantifiers);
    setAchievable((prev) => ({ ...prev, quantifiers: newQuantifiers }));
  };

  const addQuantifier = () => {
    setQuantifiers([...quantifiers, { label: '', value: 0 }]);
  };

  return (
    <div>
      <h3 className="my-2 text-lg font-medium text-gray-700">Achievable</h3>
      <label htmlFor="achievableHow" className="block text-sm font-medium text-gray-700">How can I accomplish this goal?</label>
      <textarea id="achievableHow" value={achievable.how} onChange={(e) => handleChange('how', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="achievableRealistic" className="block text-sm font-medium text-gray-700">How realistic is the goal based on other constraints?</label>
      <textarea id="achievableRealistic" value={achievable.realistic} onChange={(e) => handleChange('realistic', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      {quantifiers.map((quantifier, index) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <input type="text" value={quantifier.label} onChange={(e) => handleQuantifierChange(index, 'label', e.target.value)} placeholder="Metric Label" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          <input type="number" value={quantifier.value} onChange={(e) => handleQuantifierChange(index, 'value', e.target.value)} placeholder="Value" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
      ))}
      <button type="button" onClick={addQuantifier} className="mt-2 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
        Add Metric
      </button>
    </div>
  );
};

export default AchievableComponent;
