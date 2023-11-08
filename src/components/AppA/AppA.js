import React, { useEffect, useState } from 'react'
import StepForm from './StepForm'
function AppA() {
  const [steps, setSteps] = useState([]);
  const [targetUrl, setTargetUrl] = useState("");
  const [formId, setFormId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://forms-api.makemyhouse.com/survey-forms');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const stepsData = data[0].questions;
        setTargetUrl(data[0].target_url);
        setFormId(data[0]._id);
        console.log("stepsData", stepsData);
        setSteps(stepsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
     {steps.length > 0 && <StepForm steps={steps} targetUrl={targetUrl} formId={formId} />}
    </>
  );
}

export default AppA;