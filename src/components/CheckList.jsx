// ChecklistProgress.js

import React, { useState } from "react";
import "./Checklist.css";

const ChecklistProgress = () => {
  const [steps, setSteps] = useState([
    { step: 1, confirmed: false },
    { step: 2, confirmed: false },
    { step: 3, confirmed: false },
    { step: 4, confirmed: false },
  ]);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    const prevStep = steps[currentStep - 1];
    if (currentStep === 1 || prevStep.confirmed) {
      if ((currentStep == 1) & !steps[currentStep].confirmed) {
        const updatedSteps = [...steps];
        updatedSteps[currentStep - 1] = {
          ...steps[currentStep - 1],
          error: true,
        };
        setSteps(updatedSteps);
        console.log(updatedSteps);
      }
      setCurrentStep((prevStep) => prevStep + 1);
      console.log(steps);
    } else {
      const updatedSteps = [...steps];
      updatedSteps[currentStep - 1] = { ...prevStep, error: true };
      setSteps(updatedSteps);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleConfirm = () => {
    const updatedSteps = [...steps];
    updatedSteps[currentStep - 1] = {
      ...updatedSteps[currentStep - 1],
      confirmed: !updatedSteps[currentStep - 1].confirmed,
      error: false,
    };
    setSteps(updatedSteps);
  };

  return (
    <div className="container">
      <div className="progress-bar ">
        {steps.map((step, index) => (
          <div key={index} className="item">
            <div
              className={`${
                currentStep === step.step ? "highlight-circle" : `${
                    step.error & !step.confirmed
                      ? "highlight-circle border-red-500"
                      : ""
                  }`
              }`}
            >
              <div
                className={`circle ${
                  (step.step <= currentStep) | step.confirmed
                    ? "border-blue-500"
                    : ""
                } ${step.error & !step.confirmed ? "border-red-500" : ""}`}
              >
                <h1>{step.step}</h1>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={step.confirmed ? "line bg-blue-500" : "line"}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="content">Content for step {currentStep}</div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="confirm"
          onChange={handleConfirm}
          checked={steps[currentStep - 1].confirmed}
        />
        Confirm
      </div>
      <div className="action-container">
        <button onClick={handlePrevStep}>Prev</button>
        <button onClick={handleNextStep}>Next</button>
      </div>
    </div>
  );
};

export default ChecklistProgress;
