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
  const [formResponseId, setFormResponseId] = useState("");
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
        const verifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // reCAPTCHA resolved, continue with sending OTP
             
            },
            "error-callback": (error) => {
              // Handle the error here
              console.error("Error initializing reCAPTCHA verifier:", error);
              return;
            },
          }
        );

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
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log("Authenticated user:", user);
          setIsLoading(false)
          setStep(step + 1);


          // API For CRM Entry 
          const apiUrl2 = `https://api.makemyhouse.com/public/crm/lead`; // Replace with your API endpoint
          var name = userData.username ? userData.username : userData.mobile;

          try {
            const response = await fetch(apiUrl2, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ publicid:"e8ca07fae10a3dbadbc166c4c9dfddda","name":name,"firstname": name,"label:isdcode": "91",phone:userData.mobile,leadsource:"home planner","leadstatus":"Hot","label:Type_Status":"not contacted"}), // Pass mobileNumber in the body
            });

            const data = await response.json();
            console.log('CRM API Response:', data);

          } catch (error) {
            console.error('Error:', error);
            // Handle network errors or exceptions
          }

          // API Call for update ResponseForm 

            const apiUrl = `https://forms-api.makemyhouse.com/updateResponse/${formResponseId}`; // Replace with your API endpoint

            try {
              const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber: userData.mobile }), // Pass mobileNumber in the body
              });

              const data = await response.json();
              console.log('API Response:', data);

              // Handle success 
              if (data.flag) {
                // API call was successful
                console.log('Document updated successfully');
                // Perform actions based on success
              } else {
                // API call failed
                console.log('Error updating document:', data.message);
              }
            } catch (error) {
              console.error('Error:', error);
              // Handle network errors or exceptions
            }


          
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
      setFormResponseId(responseId);
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
        {step === 3 && <StepThree slug={slug} isd={isd} mobile={userData.mobile} responseId={formResponseId} />}
      </div>
    </div>
  );
};

export default StepForm;
