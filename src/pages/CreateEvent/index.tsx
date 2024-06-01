import { useState } from "react";
import "./styles.scss";
import EventStep from "./EventStep";
import GenerateImageStep from "./GenerateImageStep";
import CreateEventStepper from "./Stepper";

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const renderEventStep = () => {
    if (currentStep === 0) {
      return <EventStep setCurrentStep={setCurrentStep} />;
    } else if (currentStep === 1) {
      return <GenerateImageStep setCurrentStep={setCurrentStep} />;
    }
  };
  return (
    <div className="create-event-container">
      <div className="steps-container">
        <CreateEventStepper currentStep={currentStep} />
      </div>
      {renderEventStep()}
    </div>
  );
};

export default CreateEvent;
