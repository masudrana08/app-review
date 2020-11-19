import React, { useContext } from 'react';
import { ReviewContext } from '../../App';
import './ReviewSection.css'
const jsonData = require("../../review.json")
const ReviewSection = () => {
   const [store]=useContext(ReviewContext)
   const filteredReview = jsonData.filter(data=>data.appID.substring(4)==store.appName.toLowerCase())
   console.log(filteredReview.length)
   
   return (
      <div className="main-review-section">
         {
            filteredReview.map(reviewData=>{
               return( 
                  <div key={reviewData.id}>
                     viewing 1-10 of {filteredReview.length} Reviews
                     <div style={{display:"flex"}}>
                        <h3 style={{margin:0, padding:0}}>{reviewData.reviewHeading}</h3>
                        {
                           reviewData.rating == 5 &&
                           <div >
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                           </div>
                        }
                        {
                           reviewData.rating == 4 &&
                           <div >
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                           </div>
                        }
                        {
                           reviewData.rating == 3 &&
                           <div >
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                           </div>
                        }
                        {
                           reviewData.rating == 2 &&
                           <div >
                              <span className="fa fa-star checked"></span>
                              <span className="fa fa-star checked"></span>
                           </div>
                        }
                        {
                           reviewData.rating == 1 &&
                           <div >
                              <span className="fa fa-star checked"></span>
                           </div>
                        }
                     </div>
                     <p>{reviewData.reviewText}</p>
                     <div style={{display:"flex"}}>
                        <p>by {reviewData.reviewUserName}</p>
                        <p style={{marginLeft:"5px"}}>{reviewData.reviewDate}</p>
                        <p style={{marginLeft:"5px"}}>{reviewData.version}</p>
                        <p style={{marginLeft:"5px"}}>{reviewData.countryName}</p>
                        <div style={{display:"flex"}}>
                           <p>reply</p>
                           <p>share</p>
                        </div>
                     </div>

                  </div>
               )
            })
         }
      </div>
   );
};

export default ReviewSection;