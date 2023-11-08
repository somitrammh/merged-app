import React from 'react';

const StepTwo = ({ otp, setOtp, handleVerifyOtp,isLoading }) => {
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <section className='main-bdy' >
      <div className="step">
        <h2>Enter OTP</h2>
        <input type="text" name="otp" value={otp} onChange={handleOtpChange} placeholder="Enter OTP" />
        
        {isLoading ? <button >Verifying OTP..</button>:<button onClick={handleVerifyOtp}>Submit</button>}
      </div>
    </section>
  );
};

export default StepTwo;
