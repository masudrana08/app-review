import React from 'react';
import LeftBar from '../LeftBar/LeftBar';
import ReviewSection from '../ReviewSection/ReviewSection';
import './MainSection.css'
const MainSection = () => {
   return (
      <div className="main-section-container">
         <div className="left-bar-container">
            <LeftBar></LeftBar>
         </div>
         <div className="review-section-container">
            <ReviewSection></ReviewSection>
         </div>
      </div>
   );
};

export default MainSection;