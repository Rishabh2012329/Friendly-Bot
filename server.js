const express = require('express')
const app = express()
const {executeQueries} = require('./utils/Intent')
const dialogflow = require('@google-cloud/dialogflow');
const dotenv = require('dotenv')

//loads environment variables
dotenv.config()

const intentsClient = new dialogflow.IntentsClient()

// Making build folder static for accessing the frontend
app.use(express.static('./build'))

//GET Request which  sends the list of intents to the frontend
app.get('/getIntents',async (req,res)=>{
    try{
        // The path to identify the agent
        const projectAgentPath = intentsClient.projectAgentPath(process.env.PROJECTID)

        const request = {
            parent:projectAgentPath
        }
        // getting the list of intents
        const [response] = await intentsClient.listIntents(request)
        
        res.send({message:"Successful",intent:response})
    }catch(err){
        console.log("Get Intents Error",err)
        res.sendStatus(400)
    }
    return
})
   
// For sending frontend file
app.get("*",(req,res)=>{
    res.send('./build/index.html')
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server Started")
})