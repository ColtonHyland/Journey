import React from 'react';

const AchievableComponent = ({ achievable, setAchievable }) => {
  return (
    <div>
      <h3 className="my-2 text-lg font-medium text-gray-700">Achievable</h3>
      <label htmlFor="achievableHow" className="block text-sm font-medium text-gray-700">How can I accomplish this goal?</label>
      <textarea id="achievableHow" value={achievable.how} onChange={(e) => setAchievable({ ...achievable, how: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
      <label htmlFor="achievableRealistic" className="block text-sm font-medium text-gray-700">How realistic is the goal based on other constraints?</label>
      <textarea id="achievableRealistic" value={achievable.realistic} onChange={(e) => setAchievable({ ...achievable, realistic: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
    </div>
  );
};

export default AchievableComponent;
