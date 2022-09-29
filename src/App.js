import React, { useState } from 'react';
import ApiComp from "./api/ApiComp"

function App() {

  return (
    <div className="App w-full h-[100vh] m-[5px] flex justify-self-start pt-[10rem] border border-[5px]" >
      <ApiComp className="w-full h-full" />
    </div>
  );
}

export default App;
// simpler and easy to learn compare to the class based components.
//in class based component 