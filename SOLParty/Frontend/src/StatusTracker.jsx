import { useEffect, useState } from "react";
import './StatusTracker.css'
export default function StatusTracker(){

const [threshold,setThreshold] = useState(0);
let [submit,setSubmit] = useState(false);

useEffect(()=>{

    console.log('hi')
    console.log("submitted the threshold", submit);

    //change the jsx to show reset threshold


},[submit])

function handleThreshold(e){
    setThreshold(0);
    document.getElementById('threshold-value').value=0;
    setSubmit(false)

    // submit=handleInputChange(e.target.value);
    setThreshold(e.target.value)
    
    
}
function handleInputChange(e){
    setThreshold(e.target.value)
}

async function handleSubmit(){
   
    console.log(threshold);
    localStorage.setItem('threshold',threshold);

    //call backend API

    const response = await fetch ('http://localhost:3000/sol-check',{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({threshold})
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        
       setSubmit(true)

        
    } else {
        console.error('Response Error:', response);
    }
    
    
}
    return(

        <div className="StatusTrakcer-parent">

            <div>
                <input className="setThrehold" value={threshold} type="number" placeholder="Enter your threshold price" onChange={handleInputChange} id="threshold-value"/>
                {/* submit button shows the current price - on filling the threshold it turns to submit */}

                {/* initally we'll provide the simple submit button to set the trheshold price on Click */}
                {/* <button */}

                {submit===false ? <button  onClick={handleSubmit}> Submit </button> : <button onClick={handleThreshold}>Reset Threshold</button>}
                {/* // onClick={handleSubmit}>Submit</button> */}
            </div>
            
        </div>
    )
}