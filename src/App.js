import React from "react";
import { useState} from "react";
import Initstate from "./components/datafetch";



function App() {
  
  const[page, setpage]=useState(0);

  return (
    <div>
      <div>
      <h2> Select your stream:</h2>
      <button onClick={() => setpage(1)}  disabled = {page}>CSE</button>
      <button onClick={() => setpage(2)} disabled = {page}>ECE</button>
      </div>
      <div>
        <PageSet value={page}/>
      </div>
    </div>
  );
}

function PageSet(props)
{
  if(props.value === 0)
  {
     return ;
  }
  if(props.value === 1)
  {
     return <Initstate value="60"/>
  }
  if(props.value === 2)
  {
     return  <Initstate value="70"/>
  }
}
export default App;
