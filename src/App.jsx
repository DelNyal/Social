import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ChecklistProgress from "./components/CheckList";
import Test from "./components/Test";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex w-screen h-full p-5 items-center justify-center">
      <Test />
    </div>
  );
}

export default App;
