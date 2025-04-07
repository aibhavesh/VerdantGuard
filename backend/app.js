import express from 'express';
import allRoutes from './routes/allRoutes.js';
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended : true }));
app.use(cors());


app.use(allRoutes);
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server Running with port ", port);
})
