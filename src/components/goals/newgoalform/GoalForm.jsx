"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { addGoal } from "@/app/context/GoalContext";
import SpecificComponent from "./smart/SpecificComponent";
import MeasurableComponent from "./smart/MeasurableComponent";
import AchievableComponent from "./smart/AchievableComponent";
import RelevantComponent from "./smart/RelevantComponent";
import TimeBoundComponent from "./smart/TimeBoundComponent";
import ConfirmationDialog from "../../utils/ConfirmationDialog.jsx";
import { TbArrowBackUp } from "react-icons/tb";

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
    quantifiers: [],
  });
  const [achievable, setAchievable] = useState({
    how: "",
    realistic: "",
    quantifiers: [],
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
    milestones: [],
  });
  const [actionPlan, setActionPlan] = useState("");
  const [status, setStatus] = useState("active");
  const [showConfirm, setShowConfirm] = useState(false);

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
    };
    addGoal(goal);

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
    setMeasurable({
      howMuch: "",
      howMany: "",
      accomplishment: "",
      quantifiers: [],
    });
    setAchievable({ how: "", realistic: "", quantifiers: [] });
    setRelevant({
      worthwhile: "",
      rightTime: "",
      matches: "",
      rightPerson: "",
      applicable: "",
    });
    setTimeBound({
      dueDate: "",
      milestones: [],
    });
    setActionPlan("");
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const confirmCancel = () => {
    setShowConfirm(false);
  };

  const cancelCancel = () => {
    setShowConfirm(false);
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

  return (
    <div className="flex my-4">
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center"
        >
          <div className="flex">
            <div className="w-1/12 flex items-start justify-center mt-36">
              {currentStep === 0 ? (
                <button
                  onClick={handleCancel}
                  type="button"
                  className="text-xl font-semibold hover:text-black transition-colors"
                >
                  <TbArrowBackUp />
                </button>
              ) : (
                <button
                  onClick={handlePrev}
                  type="button"
                  className="text-xl font-semibold hover:text-black transition-colors"
                >
                  &#9664;
                </button>
              )}
            </div>
            <div className="w-10/12 flex flex-col justify-center min-h-screen">
              <div className="h-full">
                {steps[currentStep]}
                {currentStep === steps.length - 1 && (
                  <div className="flex justify-start space-x-4 mt-4">
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
                    >
                      Save Goal
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="py-2 px-4 border-2 border-black shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/12 flex items-start justify-center mt-36">
              {currentStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  type="button"
                  className="text-xl font-semibold hover:text-black transition-colors"
                >
                  &#9654;
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to cancel? All unsaved changes will be lost."
          onConfirm={confirmCancel}
          onCancel={cancelCancel}
          navigateTo="/goals"
        />
      )}
    </div>
  );
};

export default GoalForm;
