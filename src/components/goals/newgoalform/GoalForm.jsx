// 'use client';
// import React, { useState } from 'react';

// const GoalForm = ({ goalId }) => {
//   const [status, setStatus] = useState('active');
//   const [specific, setSpecific] = useState({
//     title: '',
//     description: '',
//     what: '',
//     why: '',
//     who: '',
//     where: '',
//     resources: '',
//   });
//   const [measurable, setMeasurable] = useState({
//     howMuch: '',
//     howMany: '',
//     accomplishment: '',
//   });
//   const [achievable, setAchievable] = useState({
//     how: '',
//     realistic: '',
//   });
//   const [relevant, setRelevant] = useState({
//     worthwhile: '',
//     rightTime: '',
//     matches: '',
//     rightPerson: '',
//     applicable: '',
//   });
//   const [timeBound, setTimeBound] = useState({
//     dueDate: '',
//     when: '',
//     sixMonths: '',
//     sixWeeks: '',
//     today: '',
//   });
//   const [actionPlan, setActionPlan] = useState('');
//   const [milestones, setMilestones] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const goal = {
//       status,
//       specific,
//       measurable,
//       achievable,
//       relevant,
//       timeBound,
//       actionPlan,
//       milestones,
//     };
//     onSave(goal);
    
//     setStatus('active');
//     setSpecific({ title: '', description: '', what: '', why: '', who: '', where: '', resources: '' });
//     setMeasurable({ howMuch: '', howMany: '', accomplishment: '' });
//     setAchievable({ how: '', realistic: '' });
//     setRelevant({ worthwhile: '', rightTime: '', matches: '', rightPerson: '', applicable: '' });
//     setTimeBound({ dueDate: '', when: '', sixMonths: '', sixWeeks: '', today: '' });
//     setActionPlan('');
//     setMilestones([]);
//   };

//   const onSave = async (goal) => {
//     try {
//       const response = await fetch(`/api/goals`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(goal),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save goal');
//       }

//       const result = await response.json();
//       console.log('Goal saved successfully:', result);
//       // Handle success (e.g., display a success message or redirect)

//     } catch (error) {
//       console.error('Error saving goal:', error);
//       // Handle error (e.g., display an error message)
//     }
//   };

//   const handleMilestoneChange = (index, value) => {
//     const newMilestones = [...milestones];
//     newMilestones[index] = value;
//     setMilestones(newMilestones);
//   };

//   const addMilestone = () => {
//     setMilestones([...milestones, '']);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="mt-1 block w-1/2 mx-auto">
//         {/* <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//           <input type="text" id="title" value={specific.title} onChange={(e) => setSpecific({ ...specific, title: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" required />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea id="description" value={specific.description} onChange={(e) => setSpecific({ ...specific, description: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="3" required></textarea>
//         </div>
//         <div>
//           <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
//           <input type="date" id="dueDate" value={timeBound.dueDate} onChange={(e) => setTimeBound({ ...timeBound, dueDate: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required/>
//         </div>
//         <div>
//           <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
//           <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//             <option value="planned">Planned</option>
//           </select>
//         </div> */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Specific</h3>
//           <label htmlFor="specificWhat" className="block text-sm font-medium text-gray-700">What do I want to achieve?</label>
//           <textarea id="specificWhat" value={specific.what} onChange={(e) => setSpecific({ ...specific, what: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="specificWhy" className="block text-sm font-medium text-gray-700">Why is this goal important?</label>
//           <textarea id="specificWhy" value={specific.why} onChange={(e) => setSpecific({ ...specific, why: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="specificWho" className="block text-sm font-medium text-gray-700">Who is involved?</label>
//           <textarea id="specificWho" value={specific.who} onChange={(e) => setSpecific({ ...specific, who: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="specificWhere" className="block text-sm font-medium text-gray-700">Where is it located?</label>
//           <textarea id="specificWhere" value={specific.where} onChange={(e) => setSpecific({ ...specific, where: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="specificResources" className="block text-sm font-medium text-gray-700">Which resources or limits are involved?</label>
//           <textarea id="specificResources" value={specific.resources} onChange={(e) => setSpecific({ ...specific, resources: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Measurable</h3>
//           <label htmlFor="measurableHowMuch" className="block text-sm font-medium text-gray-700">How much?</label>
//           <textarea id="measurableHowMuch" value={measurable.howMuch} onChange={(e) => setMeasurable({ ...measurable, howMuch: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="measurableHowMany" className="block text-sm font-medium text-gray-700">How many?</label>
//           <textarea id="measurableHowMany" value={measurable.howMany} onChange={(e) => setMeasurable({ ...measurable, howMany: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="measurableAccomplishment" className="block text-sm font-medium text-gray-700">How will I know when it is accomplished?</label>
//           <textarea id="measurableAccomplishment" value={measurable.accomplishment} onChange={(e) => setMeasurable({ ...measurable, accomplishment: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Achievable</h3>
//           <label htmlFor="achievableHow" className="block text-sm font-medium text-gray-700">How can I accomplish this goal?</label>
//           <textarea id="achievableHow" value={achievable.how} onChange={(e) => setAchievable({ ...achievable, how: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="achievableRealistic" className="block text-sm font-medium text-gray-700">How realistic is the goal based on other constraints?</label>
//           <textarea id="achievableRealistic" value={achievable.realistic} onChange={(e) => setAchievable({ ...achievable, realistic: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Relevant</h3>
//           <label htmlFor="relevantWorthwhile" className="block text-sm font-medium text-gray-700">Does this seem worthwhile?</label>
//           <textarea id="relevantWorthwhile" value={relevant.worthwhile} onChange={(e) => setRelevant({ ...relevant, worthwhile: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="relevantRightTime" className="block text-sm font-medium text-gray-700">Is this the right time?</label>
//           <textarea id="relevantRightTime" value={relevant.rightTime} onChange={(e) => setRelevant({ ...relevant, rightTime: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="relevantMatches" className="block text-sm font-medium text-gray-700">Does this match our other efforts/needs?</label>
//           <textarea id="relevantMatches" value={relevant.matches} onChange={(e) => setRelevant({ ...relevant, matches: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="relevantRightPerson" className="block text-sm font-medium text-gray-700">Am I the right person to reach this goal?</label>
//           <textarea id="relevantRightPerson" value={relevant.rightPerson} onChange={(e) => setRelevant({ ...relevant, rightPerson: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="relevantApplicable" className="block text-sm font-medium text-gray-700">Is it applicable in the current socio-economic environment?</label>
//           <textarea id="relevantApplicable" value={relevant.applicable} onChange={(e) => setRelevant({ ...relevant, applicable: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Time-bound</h3>
//           <label htmlFor="timeBoundWhen" className="block text-sm font-medium text-gray-700">When?</label>
//           <textarea id="timeBoundWhen" value={timeBound.when} onChange={(e) => setTimeBound({ ...timeBound, when: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="timeBoundSixMonths" className="block text-sm font-medium text-gray-700">What can I do six months from now?</label>
//           <textarea id="timeBoundSixMonths" value={timeBound.sixMonths} onChange={(e) => setTimeBound({ ...timeBound, sixMonths: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="timeBoundSixWeeks" className="block text-sm font-medium text-gray-700">What can I do six weeks from now?</label>
//           <textarea id="timeBoundSixWeeks" value={timeBound.sixWeeks} onChange={(e) => setTimeBound({ ...timeBound, sixWeeks: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//           <label htmlFor="timeBoundToday" className="block text-sm font-medium text-gray-700">What can I do today?</label>
//           <textarea id="timeBoundToday" value={timeBound.today} onChange={(e) => setTimeBound({ ...timeBound, today: e.target.value })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="2" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Action Plan</h3>
//           <textarea id="actionPlan" value={actionPlan} onChange={(e) => setActionPlan(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" rows="4" required></textarea>
//         </div>
//         <div>
//           <h3 className="text-lg font-medium text-gray-700">Short-term Milestones</h3>
//           {milestones.map((milestone, index) => (
//             <div key={index} className="mt-2">
//               <textarea
//                 value={milestone}
//                 onChange={(e) => handleMilestoneChange(index, e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 rows="2"
//                 required
//               ></textarea>
//             </div>
//           ))}
//           <button type="button" onClick={addMilestone} className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Add Milestone</button>
//         </div>
//         <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Goal</button>
//       </div>
//     </form>
//   );
// };

// export default GoalForm;

'use client';
import React, { useState } from 'react';
import SpecificComponent from './SpecificComponent';
import MeasurableComponent from './MeasurableComponent';
import AchievableComponent from './AchievableComponent';
import RelevantComponent from './RelevantComponent';
import TimeBoundComponent from './TimeBoundComponent';

const GoalForm = ({ goalId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [specific, setSpecific] = useState({
    title: '',
    description: '',
    what: '',
    why: '',
    who: '',
    where: '',
    resources: '',
  });
  const [measurable, setMeasurable] = useState({
    howMuch: '',
    howMany: '',
    accomplishment: '',
  });
  const [achievable, setAchievable] = useState({
    how: '',
    realistic: '',
  });
  const [relevant, setRelevant] = useState({
    worthwhile: '',
    rightTime: '',
    matches: '',
    rightPerson: '',
    applicable: '',
  });
  const [timeBound, setTimeBound] = useState({
    dueDate: '',
    when: '',
    sixMonths: '',
    sixWeeks: '',
    today: '',
  });
  const [actionPlan, setActionPlan] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [status, setStatus] = useState('active');

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goal = {
      status,
      specific,
      measurable,
      achievable,
      relevant,
      timeBound,
      actionPlan,
      milestones,
    };
    onSave(goal);

    setStatus('active');
    setSpecific({ title: '', description: '', what: '', why: '', who: '', where: '', resources: '' });
    setMeasurable({ howMuch: '', howMany: '', accomplishment: '' });
    setAchievable({ how: '', realistic: '' });
    setRelevant({ worthwhile: '', rightTime: '', matches: '', rightPerson: '', applicable: '' });
    setTimeBound({ dueDate: '', when: '', sixMonths: '', sixWeeks: '', today: '' });
    setActionPlan('');
    setMilestones([]);
  };

  const onSave = async (goal) => {
    try {
      const response = await fetch(`/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error('Failed to save goal');
      }

      const result = await response.json();
      console.log('Goal saved successfully:', result);
      // Handle success (e.g., display a success message or redirect)

    } catch (error) {
      console.error('Error saving goal:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleMilestoneChange = (index, value) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const steps = [
    <SpecificComponent specific={specific} setSpecific={setSpecific} />,
    <MeasurableComponent measurable={measurable} setMeasurable={setMeasurable} />,
    <AchievableComponent achievable={achievable} setAchievable={setAchievable} />,
    <RelevantComponent relevant={relevant} setRelevant={setRelevant} />,
    <TimeBoundComponent timeBound={timeBound} setTimeBound={setTimeBound} />,
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-1 block w-1/2 mx-auto">
        {steps[currentStep]}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              type="button"
              className="text-xl font-semibold hover:text-blue-500 transition-colors"
            >
              &#9664;
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              type="button"
              className="text-xl font-semibold hover:text-blue-500 transition-colors"
            >
              &#9654;
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Goal
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default GoalForm;
