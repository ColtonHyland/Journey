"use client";
import React, { useState } from "react";
import SpecificComponent from "./smart/SpecificComponent";
import MeasurableComponent from "./smart/MeasurableComponent";
import AchievableComponent from "./smart/AchievableComponent";
import RelevantComponent from "./smart/RelevantComponent";
import TimeBoundComponent from "./smart/TimeBoundComponent";

const GoalForm = ({ goalId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [specific, setSpecific] = useState({
    title: "",
    description: "",
    what: "",
    why: "",
    who: "",
    where: "",
    resources: "",
  });
  const [measurable, setMeasurable] = useState({
    howMuch: "",
    howMany: "",
    accomplishment: "",
  });
  const [achievable, setAchievable] = useState({
    how: "",
    realistic: "",
  });
  const [relevant, setRelevant] = useState({
    worthwhile: "",
    rightTime: "",
    matches: "",
    rightPerson: "",
    applicable: "",
  });
  const [timeBound, setTimeBound] = useState({
    dueDate: "",
    when: "",
    sixMonths: "",
    sixWeeks: "",
    today: "",
  });
  const [actionPlan, setActionPlan] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [status, setStatus] = useState("active");

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

    setStatus("active");
    setSpecific({
      title: "",
      description: "",
      what: "",
      why: "",
      who: "",
      where: "",
      resources: "",
    });
    setMeasurable({ howMuch: "", howMany: "", accomplishment: "" });
    setAchievable({ how: "", realistic: "" });
    setRelevant({
      worthwhile: "",
      rightTime: "",
      matches: "",
      rightPerson: "",
      applicable: "",
    });
    setTimeBound({
      dueDate: "",
      when: "",
      sixMonths: "",
      sixWeeks: "",
      today: "",
    });
    setActionPlan("");
    setMilestones([]);
  };

  const onSave = async (goal) => {
    try {
      const response = await fetch(`/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error("Failed to save goal");
      }

      const result = await response.json();
      console.log("Goal saved successfully:", result);
      // Handle success (e.g., display a success message or redirect)
    } catch (error) {
      console.error("Error saving goal:", error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleMilestoneChange = (index, value) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, ""]);
  };

  const steps = [
    <SpecificComponent specific={specific} setSpecific={setSpecific} />,
    <MeasurableComponent
      measurable={measurable}
      setMeasurable={setMeasurable}
    />,
    <AchievableComponent
      achievable={achievable}
      setAchievable={setAchievable}
    />,
    <RelevantComponent relevant={relevant} setRelevant={setRelevant} />,
    <TimeBoundComponent timeBound={timeBound} setTimeBound={setTimeBound} />,
  ];

  // <div className="flex justify-center">
  // <div className="flex items-stretch">
  //   <div className="flex flex-col justify-center">

  return (
    <div className="flex">
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center"
        >
          <div className="flex">
            <div className="w-1/12 flex items-start justify-center mt-36">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  type="button"
                  className="text-xl font-semibold hover:text-blue-500 transition-colors"
                >
                  &#9664;
                </button>
              )}
            </div>
            <div className="w-10/12 flex flex-col justify-center min-h-screen">
              <div className="h-full">
                {steps[currentStep]}
                {currentStep === steps.length - 1 && (
                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Goal
                  </button>
                )}
              </div>
            </div>
            <div className="w-1/12 flex items-start justify-center mt-36">
              {currentStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  type="button"
                  className="text-xl font-semibold hover:text-blue-500 transition-colors"
                >
                  &#9654;
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
