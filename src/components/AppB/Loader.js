import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Loader.css';

const headings = [
  { title: 'Processing your requirements', percentage: 15 },
  { title: 'Analysing your plot and family details', percentage: 30 },
  { title: 'Adjusting the plan according to your future needs', percentage: 45 },
  { title: 'Considering your structure choice', percentage: 65 },
  { title: 'Preparing a final layout ', percentage: 80 },
  { title: 'Your Sample 2D Floor Plan is ready!', percentage: 100 },
  // ... Add more headings and percentages
];

const Loader = ({handleNext2}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHeading, setCurrentHeading] = useState(headings[currentIndex]);
  const [percentage, setPercentage] = useState(0);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage < currentHeading.percentage) {
        setPercentage((prevPercentage) => Math.min(prevPercentage + 1, currentHeading.percentage));
      } else if (currentIndex + 1 < headings.length) {
        clearInterval(interval);
        setCurrentIndex(currentIndex + 1);
        setCurrentHeading(headings[currentIndex + 1]);
      }else{
        handleNext2()
      }
    }, 100); // Adjust this interval for smoother transitions

    return () => clearInterval(interval);
  }, [currentIndex, currentHeading, percentage]);

  useEffect(() => {
    // Show the heading with a slight delay after the loader animation
    const headingTimeout = setTimeout(() => {
      setShowHeading(true);
    }, 120); // Adjust this delay as needed

    return () => clearTimeout(headingTimeout);
  }, []);

  return (
    <div className="loader-parent">
      <div className="progressbar-container">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            root: { width: '100%' },
            path: {
              stroke: `rgba(62, 152, 199, ${percentage / 100})`,
              strokeLinecap: 'butt',
            },
            text: {
              fill: '#f88',
              fontSize: '16px',
            },
          })}
        />
      </div>
      {showHeading && (
        <h1 className='loader-hdng'  >{currentHeading.title}</h1>
      )}
    </div>
  );
};

export default Loader;
