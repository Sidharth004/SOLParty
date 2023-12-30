import { useState } from 'react'

import './App.css'

function App() {
  //set threshold to 0 OR current api fetched value of SOL
  let [threshold, setthreshold] = useState(0)

  return (
    <>

    <h1 className='title'>SOLParty🎉</h1>
    {/* {threshold = 1} */}
    {/* when threshold not set, then sow this */}
    {/* {threshold===0 ? (
      <h2>Check is your SOL Yay or Nay</h2>
    ):(<h2> Yay / Nay d</h2>)}
     */}
     <h2 className='tagline'>Check, is your SOL Yay or Nay</h2>
     <div>
      <h3 className='intro'>A fun tool to calm your cumpolsive Price Chart jitters.  <br /> Just set the thresold and hit Check to check if you're on the Yay Or Nay side, that's it! </h3>
     </div>
    
     
    </>
  )
}

export default App
