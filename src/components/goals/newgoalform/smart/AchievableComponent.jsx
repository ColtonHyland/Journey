import React, { useState } from 'react';
import { MdClose, MdAdd } from 'react-icons/md';

const AchievableComponent = ({ achievable, setAchievable }) => {
  const [quantifiers, setQuantifiers] = useState([]);

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

  const removeQuantifier = (index) => {
    const newQuantifiers = quantifiers.filter((_, i) => i !== index);
    setQuantifiers(newQuantifiers);
    setAchievable((prev) => ({ ...prev, quantifiers: newQuantifiers }));
  };

  return (
    <div>
      <h3 className="my-2 text-lg font-medium text-gray-700">Achievable</h3>
      <label htmlFor="achievableHow" className="block text-sm font-medium text-gray-700">How can I accomplish this goal?</label>
      <textarea id="achievableHow" value={achievable.how} onChange={(e) => handleChange('how', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none" rows="2" required></textarea>
      <label htmlFor="achievableRealistic" className="block text-sm font-medium text-gray-700">How realistic is the goal based on other constraints?</label>
      <textarea id="achievableRealistic" value={achievable.realistic} onChange={(e) => handleChange('realistic', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none" rows="2" required></textarea>
      <div className="space-y-2">
        {quantifiers.map((quantifier, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2 transition-transform transform duration-500 ease-in-out" style={{ width: '60%', margin: '0 auto' }}>
            <MdClose className="text-black cursor-pointer" onClick={() => removeQuantifier(index)} />
            <div className="flex items-center w-full">
              <input type="text" value={quantifier.label} onChange={(e) => handleQuantifierChange(index, 'label', e.target.value)} placeholder="Metric Label" className="mt-1 block w-4/5 border border-gray-300 rounded-md shadow-sm p-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none" />
              <input type="number" value={quantifier.value} onChange={(e) => handleQuantifierChange(index, 'value', e.target.value)} placeholder="Value" className="mt-1 block w-1/5 border border-gray-300 rounded-md shadow-sm p-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none ml-2" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button type="button" onClick={addQuantifier} className="flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          <MdAdd className="mr-1" /> Add Metric
        </button>
      </div>
    </div>
  );
};

export default AchievableComponent;
