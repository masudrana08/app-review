import React, { useContext, useState } from 'react';
import { ReviewContext } from '../../App';
import './LeftBar.css'
const jsonData = require("../../review.json")
const LeftBar = () => {
   const [store,setStore] =useContext(ReviewContext)
   let fiveStar=0, fourStar=0, threeStar=0, twoStar=0, oneStar=0;
   const versions = []
   const countries =[]

  
   jsonData.forEach(data=>{
      if(store.appName.toLowerCase() == data.appID.substring(4)){
         if(data.rating==5){
            fiveStar++
         } else if(data.rating==4){
            fourStar++
         }else if(data.rating==3){
            threeStar++
         }else if(data.rating==2){
            twoStar++
         }else if(data.rating==1){
            oneStar++
         }
      }

      if(!versions.includes(data.version)){
         versions.push(data.version)
      }
      if(!countries.includes(data.countryName)){
         countries.push(data.countryName)
      }
   })
   return (
      <div >
         
            <input onChange={ (event)=>setStore({ ...store, searchKey:event.target.value }) }
               className="search-input" type="text" placeholder="search"/>
            <div className="calender-section">
               <input value={store.calenderDate} type="date" className="date-calender"
                  onChange={ (event)=>setStore({ ...store,calenderDate:event.target.value }) }  />

               <i style={{ cursor:"pointer" }} onClick={ ()=>setStore({...store,calenderDate:""}) } 
                  class="fa fa-minus-square minus-button"></i>
            </div>

      {/* start rating filter */}
            <div>
               <p className="filter-title">Filter by Rating</p>
               <div style={{display:"flex"}}>
                  <div>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                  </div>
                  <p className="star-count">{fiveStar}</p>
               </div>
               
               <div style={{display:"flex"}}>
                  <div>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{fourStar}</p>
               </div>
               
               <div style={{display:"flex"}}>
                  <div>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{threeStar}</p>
               </div>
               
               <div style={{display:"flex"}}>
                  <div>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{twoStar}</p>
               </div>
               
               <div style={{display:"flex"}}>
                  <div>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{oneStar}</p>
               </div>
            </div>

            <div>
               <p className="filter-title">Filter by version</p>
               {
                  versions.map((data, index)=> {
                     return <p className="small-p" key={index+"data"}>{data}</p>
                  })
               }
            </div>

            <div>
               <p className="filter-title">Filter by country name</p>
               {
                  countries.map((data, index)=> {
                     return <p className="small-p" key={index+"data"}>{data}</p>
                  })
               }
            </div>
         </div>

   );
};

export default LeftBar;