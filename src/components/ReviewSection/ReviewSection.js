import React, { useContext, useEffect, useState } from 'react';
import { ReviewContext } from '../../App';
import './ReviewSection.css'
const jsonData = require("../../review.json")
const ReviewSection = () => {
   const [store,setStore]=useContext(ReviewContext)

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
            && store.calenderDate ? new Date(store.calenderDate).toUTCString().slice(5,16) == data.reviewDate.slice(0,11)
               :data.appID.substring(4)==store.appName.toLowerCase()
           
      )
   })

   let sorted = store.sortBy == "newest" ? filteredReview.sort((first,second)=>Date.parse(first.reviewDate)-Date.parse(second.reviewDate)) 
                : filteredReview.sort((first,second)=>Date.parse(second.reviewDate)-Date.parse(first.reviewDate))
   const [page,setPage]=useState({start:1, end:10, currentPage:1})
   const pageHandler = (event)=>{
      setPage({start:(event.target.innerText-1)*10+1, end:event.target.innerText*10, currentPage:event.target.innerText})
   }
   return (
      <div className="main-review-section">
         viewing {page.start}-{page.end>filteredReview.length ? filteredReview.length:page.end} of {filteredReview.length} Reviews
         {
            sorted.slice(page.start,page.end+1).map(reviewData=>{
               return( 
                  <div key={reviewData.id}>
                     
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
         <div>
            <span onClick={(event)=>setPage({...page,currentPage:page.currentPage-1})}>Prev</span>
            <span onClick={event=>pageHandler(event)}>{Number(page.currentPage)+3<Math.ceil(filteredReview.length/10)?Number(page.currentPage):Math.ceil(filteredReview.length/10-4)} </span>
            <span onClick={event=>pageHandler(event)}>{Number(page.currentPage)+3<Math.ceil(filteredReview.length/10)?Number(page.currentPage)+1:Math.ceil(filteredReview.length/10-3)} </span>
            <span onClick={event=>pageHandler(event)}>{Number(page.currentPage)+3<Math.ceil(filteredReview.length/10)?Number(page.currentPage)+2:Math.ceil(filteredReview.length/10-2)} </span>
            ...
            <span onClick={event=>pageHandler(event)}>{Math.ceil(filteredReview.length/10-1)} </span>
            <span onClick={event=>pageHandler(event)}>{Math.ceil(filteredReview.length/10)} </span>
            <span onClick={(event)=>setPage({...page,currentPage:page.currentPage+1})}>Next</span>
         </div>
      </div>
   );
};

export default ReviewSection;