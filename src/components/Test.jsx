import React, { useState, useEffect } from "react";
import OTPForm from "./OTPForm";
import { sendEmail } from "../api/mailApi";
export default function Test() {
  const [steps, setSteps] = useState([
    { step: 1, confirmed: false },
    { step: 2, confirmed: false },
    { step: 3, confirmed: false },
    { step: 4, confirmed: false },
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [verificationResult, setVerificationResult] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const generateOTP = () => {
    const randomOTP = Math.floor(1000 + Math.random() * 9000);
    setOTP(randomOTP.toString());
    return randomOTP.toString();
  };
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
      }
      setCurrentStep((prevStep) => prevStep + 1);
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
  const handleSendMail = async () => {
    try {
      const otp = generateOTP();
      console.log(otp);

      const formData = {
        from: {
          email: "social@trial-zr6ke4n8kv34on12.mlsender.net",
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "OTP Verification",
        text: "noreply just otp code!",
        html: `<html><body><h1>Dear ${name},</h1><p>Your OTP for verification is: ${otp}</p></body></html>`,
      };
      const form = {
        to: email,
        name: name,
        subject: "OTP Verification",
        otp: `${otp}`,
      };
     const response = await sendEmail(form);
     console.log(response);
      // sendMailer(email,name,`<html><body><h1>OTP Verification</h1><p>Your OTP for verification is: ${otp}</p></body></html>`);
      handleNextStep();
      handleConfirm();
    } catch (error) {
      console.log(error);
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
  const handleVerify = (verificationCode) => {
    console.log(verificationCode + ":" + otp);
    const isValid = verificationCode === otp; // Example verification code
    setVerificationResult(isValid);
    if (isValid) {
      handleNextStep();
      handleConfirm();
    } else {
      alert("Verificatioin failed!");
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center before:absolute before:w-40 before:h-32 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12   z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6 ">
      <div className=" flex items-center">
        {steps.map((step, index) => (
          <div key={index} className="item flex items-center justify-between">
            <div
              onClick={() => {
                if (currentStep > index + 1) {
                  setCurrentStep(index + 1);
                }
              }}
              className={`${
                currentStep === step.step ? "highlight-circle" : ``
              }`}
            >
              <div
                className={`circle ${
                  (step.step <= currentStep) | step.confirmed
                    ? "border-blue-500"
                    : ""
                } ${
                  step.error & !step.confirmed
                    ? "border-red-500 border-dashed"
                    : ""
                }`}
              >
                <h1>{step.step}</h1>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={` ${
                  step.confirmed
                    ? "line lg:w-[5rem] bg-blue-500"
                    : "line lg:w-[5rem]"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="content-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-content ${
              currentStep === step.step ? "active" : ""
            }`}
            style={{
              pointerEvents: currentStep === step.step ? "auto" : "none",
            }}
          >
            {step.step === 1 && (
              <div className="flex ">
                <form className="text-neutral-800 relative overflow-hidden flex flex-col justify-around w-96 h-44  rounded-lg  p-3 px-6">
                  <div className="">
                    <span className="font-extrabold text-2xl text-violet-600">
                      Name Setup
                    </span>
                    <p className="text-neutral-700">
                      Sign up for our newsletter and you'll be the first to find
                      out about new features
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <div className="relative rounded-lg w-full overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                      <input
                        placeholder="Enter your name..."
                        className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleNextStep();
                        name.trim() !== "" ? handleConfirm() : "";
                      }}
                      className="bg-violet-500 p-[5px_15px] text-neutral-50  rounded-lg hover:bg-violet-400"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            )}
            {step.step === 2 && (
              <div className="flex ">
                <form className="text-neutral-800 relative overflow-hidden flex flex-col justify-around w-96 h-44  rounded-lg  p-3 px-6">
                  <div className="">
                    <span className="font-extrabold text-2xl text-violet-600">
                      Email SetUP
                    </span>
                    <p className="text-neutral-700">
                      Sign up for our newsletter and you'll be the first to find
                      out about new features
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <div className="relative rounded-lg w-full overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                      <input
                        placeholder="Enter your Email..."
                        className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        email.trim() !== "" ? handleSendMail() : "";
                      }}
                      className="bg-violet-500 p-[5px_15px] text-neutral-50  rounded-lg hover:bg-violet-400"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            )}
            {step.step === 3 && <OTPForm onVerify={handleVerify} />}
            {step.step === 4 && (
              <div className="flex ">
                <form className=" gap-[5px] text-neutral-800 relative overflow-hidden flex flex-col justify-around w-96 h-44  rounded-lg  p-3 px-6">
                  <div className="">
                    <span className="font-extrabold text-2xl text-violet-600">
                      Password SetUP
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div className="relative rounded-lg w-full overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                      <input
                        placeholder="Enter your password..."
                        className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="relative rounded-lg w-full overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                      <input
                        placeholder="Confirm your password..."
                        className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                        type="text"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleNextStep();
                      handleConfirm();
                    }}
                    className="bg-violet-500 p-[10px_15px] text-neutral-50  rounded-lg hover:bg-violet-400"
                  >
                    Confirm
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div className=" w-full h-full flex items-center justify-center m-5">
      <div className={`step-content ${currentStep === 1 ? "active" : ""}`}>
      <div className="flex ">
          <form className="text-neutral-800 relative overflow-hidden flex flex-col justify-around w-96 h-44  rounded-lg  p-3 px-6">
            <div className="">
              <span className="font-extrabold text-2xl text-violet-600">
                Name Setup
              </span>
              <p className="text-neutral-700">
                Sign up for our newsletter and you'll be the first to find out
                about new features
              </p>
            </div>
            <div className="flex gap-1">
              <div className="relative rounded-lg w-full overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                <input
                  placeholder="Enter your name..."
                  className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                  type="text"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  handleNextStep();
                  handleConfirm();
                }}
                className="bg-violet-500 p-[5px_15px] text-neutral-50  rounded-lg hover:bg-violet-400"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
        </div>
        <div className={`step-content ${currentStep === 2 ? "active" : ""}`}>
          Content for Step 2
        </div>
        <div className={`step-content ${currentStep === 3 ? "active" : ""}`}>
          Content for Step 3
        </div>
        <div className={`step-content ${currentStep === 4 ? "active" : ""}`}>
          Content for Step 4
        </div>
        
      </div> */}
      {/* <div className="checkbox-container">
        <input
          type="checkbox"
          className="confirm"
          onChange={handleConfirm}
          checked={steps[currentStep - 1].confirmed}
        />
        Confirm
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          className="p-[5px_15px] rounded-md bg-blue-500"
          onClick={handlePrevStep}
        >
          Prev
        </button>
        <button
          className="p-[5px_15px] rounded-md bg-blue-500"
          onClick={handleNextStep}
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
