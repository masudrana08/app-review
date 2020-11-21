import React, { useContext, useEffect, useState } from 'react';
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

   let versionCollection =[]
   let countryCollection =[]
   
   versions.forEach((version,index)=>{
     versionCollection.push([])
     jsonData.forEach((data)=>{
      if( data.version == version && data.appID.substring(4) == store.appName.toLowerCase()){
         versionCollection[index].push(version)
      }
   })
})
   
   countries.forEach((country,index)=>{
     countryCollection.push([])
     jsonData.forEach((data)=>{
      if( data.countryName == country && data.appID.substring(4) == store.appName.toLowerCase()){
         countryCollection[index].push(country)
      }
     })
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
               <div className="rating-star">
                  <div onClick={event=>setStore({...store, star:5})}>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                  </div>
                  <p className="star-count">{fiveStar}</p>
               </div>
               
               <div className="rating-star">
                  <div onClick={event=>setStore({...store, star:4})}>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{fourStar}</p>
               </div>
               
               <div className="rating-star">
                  <div onClick={event=>setStore({...store, star:3})}>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{threeStar}</p>
               </div>
               
               <div className="rating-star">
                  <div onClick={event=>setStore({...store, star:2})}>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star checked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                     <span className="fa fa-star unchecked"></span>
                  </div>
                  <p className="star-count">{twoStar}</p>
               </div>
               
               <div className="rating-star">
                  <div onClick={event=>setStore({...store, star:1})}>
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
                     return <div style={{margin:0, padding:0, display:"flex"}} >
                        <p onClick={event=>setStore({...store, version:event.target.innerText})} className="small-p" key={index+"data"}>{data}</p>
                        <p className="small-p" >{versionCollection[index].length}</p>
                     </div>
                  })
               }
            </div>

            <div>
               <p  className="filter-title">Filter by country name</p>
               {
                  countries.map((data, index)=> {
                     return <div style={{margin:0, padding:0, display:"flex"}} >
                              <p onClick={event=>setStore({...store, country:event.target.innerText})} className="small-p" key={index+"data"}> {data} </p>
                              <p className="small-p" >{countryCollection[index].length}</p>
                           </div>
                  })
               }
            </div>
         </div>

   );
};

export default LeftBar;