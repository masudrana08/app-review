import React, { useContext, useEffect, useState } from 'react';
import { ReviewContext } from '../../App';
import './ReviewSection.css'
const jsonData = require("../../review.json")
const ReviewSection = () => {
   const [currentPage,setCurrentPage]=useState(1)
   const [store,setStore]=useContext(ReviewContext)
   useEffect(()=>{
      setCurrentPage(1)
   },[store.searchKey, store.calenderDate])
   const filteredReview = jsonData.filter(data=>{
      
      return(
         store.calenderDate &&  store.searchKey?.length>0?
            new Date(store.calenderDate).toUTCString().slice(5,16) == data.reviewDate.slice(0,11)
               && data.reviewHeading.toLowerCase().indexOf(store.searchKey?.toLowerCase()) != -1 
            :data.appID.substring(4)==store.appName.toLowerCase() 

            &&
            store.searchKey?.length>0 ? 
               data.reviewHeading.toLowerCase().indexOf(store.searchKey?.toLowerCase()) != -1 
               :data.appID.substring(4)==store.appName.toLowerCase() 
            && 
            store.calenderDate ? new Date(store.calenderDate).toUTCString().slice(5,16) == data.reviewDate.slice(0,11) 
               :data.appID.substring(4)==store.appName.toLowerCase() 
           
      )
   })

   let sorted = store.sortBy == "newest" 
         ? filteredReview.sort((first,second)=>Date.parse(first.reviewDate)-Date.parse(second.reviewDate)) 
         : filteredReview.sort((first,second)=>Date.parse(second.reviewDate)-Date.parse(first.reviewDate))

   
   const pageHandler = (event)=>{
      event.target?.innerText && event.target?.innerText>0 && event.target?.innerText<=Math.ceil(filteredReview.length/10)
      ? setCurrentPage(Number(event.target.innerText))
      : event > 0 && event<=Math.ceil(filteredReview.length/10) && setCurrentPage(event)
   }
   return (
      <div className="main-review-section">
         <p>
            viewing {
               (currentPage-1) * 10 + 1} - {
               currentPage * 10 < filteredReview.length
               ? currentPage * 10
               : filteredReview.length
            } of {filteredReview.length} Reviews
         </p>

         {
            sorted.slice(
               (currentPage-1) * 10 + 1, currentPage * 10
            ).map(reviewData=>{
               return( 
                  <div className="reviewData-component" key={ reviewData.id }>
                     
                     <div style={{ display:"flex" }}>
                        <h3 className="review-title">{ reviewData.reviewHeading }</h3>
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

                     <p className="review-text">{ reviewData.reviewText }</p>
                     <div className="reviewData-bottom-section">
                        <div style={{ display:"flex" }}>
                           <p>by { reviewData.reviewUserName }</p>
                           <p>{ reviewData.reviewDate }</p>
                           <p>{ reviewData.version }</p>
                           <p>{ reviewData.countryName }</p>
                        </div>
                        <div style={{ display:"flex"}}>
                           <p>reply</p>
                           <p>share</p>
                        </div>
                     </div>

                  </div>
               )
            })
         }

         {/* pagination of total review */}

         <div className="pagination-container">
            <span className="pagination-button" onClick={ event=>pageHandler(currentPage-1) }>Prev</span>
            <span className="pagination-button" onClick={ event=>pageHandler(event) }>
               {
                  Number(currentPage)+3<Math.ceil(filteredReview.length/10)
                  ? Number(currentPage)
                  : Math.ceil(filteredReview.length/10-4)
               } 
            </span>
            <span className="pagination-button" onClick={event=>pageHandler(event)}>
               {
                  Number(currentPage)+3<Math.ceil(filteredReview.length/10)
                  ? Number(currentPage)+1
                  : Math.ceil(filteredReview.length/10-3)
               } 
            </span>
            <span className="pagination-button" onClick={event=>pageHandler(event)}>
               {
                  Number(currentPage)+3<Math.ceil(filteredReview.length/10)
                  ? Number(currentPage)+2
                  : Math.ceil(filteredReview.length/10-2)
               } 
            </span>
            _ _
            <span className="pagination-button" onClick={event=>pageHandler(event)}>
               {Math.ceil(filteredReview.length/10-1)} 
            </span>
            <span className="pagination-button" onClick={event=>pageHandler(event)}>
               {Math.ceil(filteredReview.length/10)} 
            </span>
            <span className="pagination-button" onClick={(event)=>pageHandler(currentPage+1)}>
               Next
            </span>
         </div>
      </div>
   );
};

export default ReviewSection;