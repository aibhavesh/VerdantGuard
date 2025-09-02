import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bhavesh";
const usingEnv = !!process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`LIVE DB CONNECTED using ${usingEnv ? 'env MONGO_URI' : 'default URI'}`);
})
.catch((err) => {
    console.error(`LIVE DB NOT CONNECTED (using ${usingEnv ? 'env MONGO_URI' : 'default URI'})`, err);
});

export default mongoose;
// mongodb+srv://jamessteppingstone:<db_password>@cluster0.vvaox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// jamessteppingstone
// TijO3Hu5QbkLAJ0W

//aibhavesh27
//yglaJyfKQAh1aSoz
//mongodb+srv://aibhavesh27:<db_password>@cluster0.mnj2arj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0