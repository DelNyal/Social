import React, { useState, useRef } from "react";

const OTPForm = ({onVerify}) => {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Automatically focus on the next input field
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = inputs.join("");
    console.log("Verification Code:", JSON.stringify(verificationCode));
    onVerify(verificationCode);
    // Add your verification logic here
  };

  return (
    <form className="form bg-white rounded-lg">
      <div className="title text-xl font-bold text-center">
        Verification Code
      </div>
      <p className="message text-gray-500 text-sm text-center ">
        We have sent a verification code to your email adress
      </p>
      <div className="inputs flex flex-row justify-center">
        {inputRefs.map((inputRef, index) => (
          <input
            key={index}
            ref={inputRef}
            type="number"
            maxLength="1"
            className="w-12 h-12 text-center  border-2 border-gray-300 m-2 focus:border-royalblue outline-none"
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleVerify}
        className="action w-full mt-3 py-3 px-4 rounded-lg  bg-royalblue text-white bg-neutral-500 cursor-pointer"
      >
        verify me
      </button>
    </form>
  );
};

export default OTPForm;
