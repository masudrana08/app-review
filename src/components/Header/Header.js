import React, { useContext, useEffect } from 'react';
import { ReviewContext } from '../../App';
import './Header.css'
// import {reviewData} from '../../review'
const jsonData = require("../../review.json")
const Header = () => {
   const [store,setStore]=useContext(ReviewContext)
   const apps =[]
   jsonData.map(reviewData=>{           
      if ( !apps.includes(reviewData.appID) ) {
         apps.push(reviewData.appID)
      }
   })
   return (
      <div className="header-container">

         <div >
            <p className="my-label">select products</p>
            <select className="select-product" onChange={(event)=>setStore({...store, appName:event.target.value})} name="appName" id="appName">
               {
                  apps.map((app,index)=>
                     <option key={app+index}>
                        { app.slice(4).charAt(0).toUpperCase()+app.slice(4).substring(1) }
                     </option>)
               }
            </select>
         </div>

         <div>
            <div style={{ display:"flex"}} >
               <div >
                  <p className="my-label">sorting</p>
                  <select className="select-option" onChange={(event)=>setStore({...store, sortBy:event.target.value})} name="sortByTime" id="sortByTime">
                     <option value="newest">Newest First</option>
                     <option value="oldest">Oldest First</option>
                  </select>
               </div>

               <div style={{marginLeft:"10px"}}>
                  <p className="my-label">translation</p>
                  <select className="select-option" name="language" id="language">
                     <option>English</option>
                     <option>Bangla</option>
                     <option>Hindi</option>
                  </select>
               </div>
            </div>
         </div>


      </div>
   );
};

export default Header;