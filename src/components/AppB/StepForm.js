import React, { useState, useEffect } from "react";
import firebase from "./firebaseConfig"; // Adjust the path to your firebaseConfig file
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useParams } from "react-router-dom";
import "./App.css";
import StepThree from "./StepThree";
import Loader from "./Loader";
import "./Loader.css";

const StepForm = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    mobile: "",
  });
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isd, setIsd] = useState("+91");

  const queryString = window.location.search; // Get the query string from the URL
  const urlParams = new URLSearchParams(queryString);
  const { slug } = useParams();

  const handleCountryCodeChange = (code) => {
    setIsd(code);
    console.log("selected country code", code);
  };
  const handleNext2 = () => {
    setStep(step + 1);
  };

  const handleNext = async () => {
    if (step === 1) {
      try {
        setIsLoading(true)
        // Initialize reCAPTCHA verifier
        const verifier = await new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA resolved, continue with sending OTP
             
            },
            "error-callback": (error) => {
              // Handle the error here
              console.error("Error initializing reCAPTCHA verifier:", error);
            },
          }
        );

        console.log("recaptcha resolved")
        console.log("mobile number",`${isd}${userData.mobile}`)
        var mobileNumber = `${isd}${userData.mobile}`;
        firebase
          .auth()
          .signInWithPhoneNumber(mobileNumber, verifier)
          .then((confirmationResult) => {
            setStep(step + 1);
            setIsLoading(false)
            setConfirmationResult(confirmationResult);
          })
          .catch((error) => {
            console.log("Error sending code:", error);
          });
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
      }
    } else {
      // Handle other steps
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true)
      confirmationResult
        .confirm(otp)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Authenticated user:", user);
          setIsLoading(false)
          setStep(step + 1);
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
    }
  };
  useEffect(() => {
    const formId = urlParams.get("Fx");
    const responseId = urlParams.get("Rx");
    // console.log("slug details",formId)
    if (responseId) {
      // console.log("response_id after check",responseId)
      try {
            fetch(`https://forms-api.makemyhouse.com/response/${responseId}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                const dataObject = data.answer[0];
                let formattedData = "";

                for (const key in dataObject) {
                  if (dataObject.hasOwnProperty(key)) {
                    const formattedKey = key.replace(/\s+/g, " ").trim();
                    const formattedValue = JSON.stringify(dataObject[key]);
                    formattedData += `question:${formattedKey}\n Answer:${formattedValue}\n`;
                  }
                }

                // console.log("form data:",formattedData);
              })
              .catch((error) => {
                console.log("Fetch error:", error);
              });
          } catch (error) {
            console.log("Error initializing reCAPTCHA:",error);
          }
    }
  },[]);

  return (
    <div className="step-form-container">
      <div className="step-form">
        {step === 0 && <Loader handleNext2={handleNext2} />}
        {step === 1 && (
          <StepOne
            handleCountryCodeChange={handleCountryCodeChange}
            userData={userData}
            setUserData={setUserData}
            handleNext={handleNext}
            isLoading={isLoading}
          />
        )}
        {step === 2 && (
          <StepTwo
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            isLoading={isLoading}
          />
        )}
        {step === 3 && <StepThree slug={slug} isd={isd} mobile={userData.mobile} />}
      </div>
    </div>
  );
};

export default StepForm;
