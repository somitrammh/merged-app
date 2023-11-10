import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form, ProgressBar } from "react-bootstrap";
import "./App.css";

const StepForm = ({steps,targetUrl,formId}) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepFirst, setActiveStepFirst] = useState(true);
  const [formData, setFormData] = useState({});
  const [formDataPart, setFormDataPart] = useState({SiteDetails:{}});
  const [errors, setErrors] = useState({});
  const [isRadioError, setIsRadioError] = useState(false);
  
  useEffect(() => {
    resetFormValues()
  }, [])
  
  useEffect(() => {
    console.log("new part ", formDataPart);
  }, [formDataPart]);

     // POST API call for store Form data
  const storeFormData = (answer)=>{
    fetch('https://forms-api.makemyhouse.com/survey-forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({answer,formId}),
      })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.status === 201) {
                console.log('Response Data:', responseData.insertedId);
                const queryParams = `Fx=${formId}&Rx=${responseData.insertedId}`; 

                    // Construct the final URL with query parameters
                    const finalUrl = `/response/form_one_64e59ece81a786fc0e09fa8a?${queryParams}`;
                    navigate(finalUrl);
                    // window.location.href = finalUrl
              } else {
               alert('Request failed with status:', responseData.status);
              }
        })
        .catch(error => {
          alert('Error posting data:', error.message);
        });
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };
  const handleNext = () => {
    if (validateForm()) {

    if (activeStep === 15) {
      let valueNew = formData["design_structure"]
        ? formData["design_structure"].trim()
        : "";
      if (valueNew === "Single Family House") {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
      } else if (
        formData["design_structure"] === undefined ||
        formData["design_structure"] === "undefined" ||
        formData["design_structure"] === null
      ) {
        // validateForm();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
      console.log("form data",formData);
    }
    }
  };
  const handleFinish = () => {

    // if (validateForm()) {
      const newData = {};

      Object.keys(formData).forEach((key) => {
        const matchingStep = steps.find((step) =>
          step.fields.some((field) => field.name === key)
        );

        if (matchingStep) {
        //   const matchingField = matchingStep.fields.find(
        //     (field) => field.name === key
        //   );

          const label = matchingStep.label; // Get the label from the matching step
          newData[label] = formData[key]; // Use the label as the new key
        }
      });
    //   let formattedData = "";

      // Object.keys(newData).forEach((question) => {
      //   const answer = newData[question];
      //   formattedData += `Q: ${question}\nA: ${answer}\n\n`;
      // });
      var mergedObject = Object.assign({}, newData, formDataPart);
    

      storeFormData(mergedObject)
      // setActiveStep(steps.length - 1);
    // }
  };

  const handleBack = () => {
    setIsRadioError(false);
    
    if (activeStep === 17) {
      let valueNew = formData["design_structure"]
        ? formData["design_structure"].trim()
        : "";
      if (valueNew === "Single Family House") {
        setActiveStep((prevActiveStep) => prevActiveStep - 2);
      } else if (valueNew !== "Single Family House") {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleChangeSecond = (event) => {
    const { name, value } = event.target;
    setFormDataPart((prevFormDataPart) => ({
        ...prevFormDataPart,
        SiteDetails: {
          ...prevFormDataPart.SiteDetails,
          [name]: value,
        },
      }));
  
  };

  const validateForm = () => {
    const currentStep = steps[activeStep];
    let isValid = true;
    setIsRadioError(false)
   
      const currentFields = currentStep.fields;

      currentFields.forEach((field) => {
   
        if (!formData[field.name] || formData[field.name].trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field.name]: "This field is required",
          }));
          isValid = false;
          // if(field.type == 'radio'){
            setIsRadioError(true);
          // }
        }
        
      });

    return isValid;
  };

  const resetFormValues = () => {
    setFormData({});
    setErrors({});
  };

  const renderRadioOptions = (options, fieldName) => {
    return options.map((option, index) => {
      const uniqueId = `${fieldName}-${index}`;
      return (
        <div key={uniqueId} className="radio-option">
          <Form.Check
            type="radio"
            id={uniqueId}
            name={fieldName}
            value={option}
            checked={formData[fieldName] === option}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <label htmlFor={uniqueId}>{option}</label>
        </div>
      );
    });
  };

  const renderRadioOptionsWithimages = (options, fieldName, fieldImages) => {
    console.log("images", fieldImages);

    return options.map((option, index) => {
      const uniqueId = `${fieldName}-${index}`;
      return (
        <div className="col-md-4">
        <div key={uniqueId} className="radio-option">
        
          <Form.Check
            type="radio"
            id={uniqueId}
            name={fieldName}
            value={option}
            checked={formData[fieldName] === option}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            
          />
          <label htmlFor={uniqueId}>
            {fieldImages ? (
              fieldImages[index] ? (
                // <img src={fieldImages[index]}  />
                <div>
                    <img src={fieldImages[index]} width={'100%;'} alt="" />
                    <div>{option}</div>
                </div>
              ) : (
                option
              )
            ) : (
              option
            )}
          </label>
        </div>
        </div>
      );
    });
  };


  const renderRadioOptionsExtra = (options, fieldName,extra) => {
    return options.map((option, index) => {
      const uniqueId = `${fieldName}-${index}`;
      return (
        <div key={uniqueId} className="radio-option">
          <Form.Check
            type="radio"
            id={uniqueId}
            name={fieldName}
            value={option}
            checked={formDataPart.SiteDetails[fieldName] === option}
            onChange={handleChangeSecond}
            onKeyDown={handleKeyPress}
            
          />
          <label htmlFor={uniqueId}>{option}</label>
        </div>
      );
    });
  };

  const renderRadioOptionsWithimagesExtra = (options, fieldName, fieldImages,extra) => {
    console.log("images", fieldImages);

    return options.map((option, index) => {
      const uniqueId = `${fieldName}-${index}`;
      return (
        <div key={uniqueId} className="radio-option">
          <Form.Check
            type="radio"
            id={uniqueId}
            name={fieldName}
            value={option}
            checked={formDataPart.SiteDetails[fieldName] === option}
            onChange={handleChangeSecond}
            onKeyDown={handleKeyPress}
            
          />
          <label htmlFor={uniqueId}>
            {fieldImages ? (
              fieldImages[index] ? (
                // <img src={fieldImages[index]}  />
                <div>
                    <img src={fieldImages[index]} width={'100%;'} alt="" />
                    <div>{option}</div>
                </div>
              ) : (
                option
              )
            ) : (
              option
            )}
          </label>
        </div>
      );
    });
  };

 
  const startActivePage = () =>{
    setActiveStepFirst(false);
  }

  const totalSteps = steps.length;
  const progress = (activeStep / (totalSteps - 1)) * 100;

  return (
    <div className="container-fluid qwert">
      <div className="row w-100">
        {
          activeStepFirst ? (<div className="col-md-6 m-auto">
            <div className="card p-2">
              <div className="card-body text-center">
                <h5 className="card-title mb-3" style={{color:"white"}}><strong>Ai</strong> based Floorplanning</h5>
                <h6 style={{color:"white"}}>Unlock your floor plan in just 30 secs</h6>
                <button type="button" className="btn btn-primary mt-5 mb-5" style={{width:"auto"}} onClick={startActivePage}>Lets Begin !!!</button>
              </div>
            </div> </div>) : ( <div className="col-md-6 m-auto">
          <ProgressBar now={progress}  className="mb-3" />
          <div className="card p-2">
            <div className="card-body">
              {activeStep === steps.length - 1 ? (
                steps[activeStep].template
              ) : (
                <>
                  <h5 className="card-title mb-3" >{steps[activeStep].label}</h5>
                  <p className="card-title mb-0">{steps[activeStep].smallText}</p>
                    <div className="row">
                 
                      {steps[activeStep].fields.map((field) => (
                        <Form.Group key={field.name} controlId={field.name} className={field.extra === undefined ? 'col-md-12':'col-sm-6'}>
                         
                          {field.type === "radio" ? (
                            <div className={field.images === undefined ? '':"row"}>
                              {
                              field.extra === undefined ? 
                              (field.images === undefined
                                ? renderRadioOptions(field.options,field.name,)
                                : renderRadioOptionsWithimages(
                                    field.options,
                                    field.name,
                                    field.images
                                  )) : (field.images === undefined
                                    ? renderRadioOptionsExtra(field.options,field.name,field.extra)
                                    : renderRadioOptionsWithimagesExtra(
                                        field.options,
                                        field.name,
                                        field.images,
                                        field.extra
                                      ))
                                  
                                  }
                            </div>
                          ) : (
                            <Form.Control
                              type={field.type}
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={handleChange}
                              onKeyDown={handleKeyPress}
                            />
                          )}
                          {/* <Form.Control.Feedback type="invalid" style={{display:'block!important'}}>
                            {errors[field.name]}
                          </Form.Control.Feedback> */}
                        </Form.Group>
                      ))}
                    </div>

                      {isRadioError && (<div style={{color:"red"}}>(This field is required)</div>)}

                  <div className="mt-3 row" style={{border:"unset",background:"unset"}}>
                  <div className="col-md-6  text-left">
                    {activeStep !== 0 ? (
                      
                        <Button
                          variant="secondary"
                          onClick={handleBack}
                          disabled={activeStep === 0}
                        >
                          Back
                        </Button>
                      
                    ) : (
                      ""
                    )}
                    </div>
                    {" "}
                    <div className="col-md-6  text-right">
                      <Button className="ml-2"
                        variant="primary"
                        onClick={
                          activeStep === steps.length - 2
                            ? handleFinish
                            : handleNext
                        }
                      >
                        {activeStep === steps.length - 2 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>)
        }
       
      </div>
    </div>
  );
};

export default StepForm;
