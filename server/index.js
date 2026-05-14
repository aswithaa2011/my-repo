import express from "express" 
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"



dotenv.config()

const app=express()



app.use(cors())
app.use(express.json())

connectDb()

import projectRoutes from './Routes/projectRoutes.js';
app.use('/api/projects', projectRoutes);

const port =process.env.PORT || 3000


app.listen(port,()=>{


    console.log(`server connected http://localhost:${port}` );


    
})

