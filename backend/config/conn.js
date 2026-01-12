import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/verdantguard";
const usingEnv = !!process.env.MONGO_URI;
mongoose.connect(mongoUri)
.then(() => {
    console.log(`LIVE DB CONNECTED using ${usingEnv ? 'env MONGO_URI' : 'default URI'}`);
})
.catch((err) => {
    console.error(`LIVE DB NOT CONNECTED (using ${usingEnv ? 'env MONGO_URI' : 'default URI'})`, err);
});

export default mongoose;