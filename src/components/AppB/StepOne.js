import React from 'react';
import Select from 'react-select';
import countryCode from './countryCode.json';
const StepOne = ({ userData, setUserData, handleNext,handleCountryCodeChange ,isLoading}) => {

  const optionsCountry = countryCode.map(code => ({
    value: code.dial_code,
    label: `${code.flag}(${code.dial_code})`
  }));
  const  handleCountryCodeSelect = (selectedOption) => {
    // Call the callback function to send the selected city to the parent
    handleCountryCodeChange(selectedOption.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className='main-bdy' >
      <div className="step">
        <h2>Your Requirements Are Verified And Submitted Successfully. Enter Your Details To Get 2D Conceptualized Plan</h2>
       <div className='row' >
        <div className='col-sm-12 mb-4' >
            <input type="text" name="username" className='w-100' value={userData.username} onChange={handleInputChange} placeholder="Username" />
            <div className='icon-inp' >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg>
            </div>
        </div>
          <div className='col-4 pr-0' >
            <Select
                options={optionsCountry}
                onChange={handleCountryCodeSelect}
                placeholder="+1"
            />
            </div>
          <div className='col-8 pl-0' >
            <div className='icon-inp' >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
              <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
              <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            </div>
             <input type="text" name="mobile" className='w-100 nmbr' value={userData.mobile} onChange={handleInputChange} placeholder="Mobile Number" />
          </div>
       </div>     
      <div id="recaptcha-container"></div>{/* reCAPTCHA container */}
      {isLoading ? <button >Sending OTP..</button>:<button onClick={handleNext}>Next</button>}
      
    </div>
    </section>
  );
};

export default StepOne;
