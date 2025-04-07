import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("LIVE DB CONNECTED")
})
.catch((err)=>{
    console.log("LIVE DB NOT CONNECTED", err)
})

export default mongoose;
// mongodb+srv://jamessteppingstone:<db_password>@cluster0.vvaox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// jamessteppingstone
// TijO3Hu5QbkLAJ0W

//aibhavesh27
//yglaJyfKQAh1aSoz
//mongodb+srv://aibhavesh27:<db_password>@cluster0.mnj2arj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0