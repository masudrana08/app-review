import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ReviewSection from './components/MainSection/MainSection';
export const ReviewContext = createContext()
function App() {
  const [store,setStore] = useState({appName:"myntra"})
  return (
    <ReviewContext.Provider value={[store,setStore]}>
      <div style={{width:"80%", margin:"auto"}}>
        <Header></Header>
        <ReviewSection></ReviewSection>
      </div>
    </ReviewContext.Provider>
  );
}

export default App;
