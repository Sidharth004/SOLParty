import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors';


const app = express();
app.use(cors())

app.use(express.json());

//route to check SOL price 
app.post('/sol-check',async(req,res)=>{
    //get threshold from req body

    const {threshold} = req.body;

    //fetch current sol price
    const apiUrl= 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

    const solPrice = await fetch(apiUrl)
        .then(res => res.json())
        .then(data => data.solana.usd);

    
    if(solPrice > threshold){
        res.set('Content-Type', 'application/json');
        res.json({message: 'SOL price is up!'});
    }else{
        res.set('Content-Type', 'application/json');
        res.json({message:"SOL price is not up"});
    }
    
});

app.listen(3000,()=>{
    console.log('server running on port 3000');
})