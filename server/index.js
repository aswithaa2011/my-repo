import express from "express" 
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRoutes from './Routes/authRoutes.js';
import projectRoutes from './Routes/projectRoutes.js';
import jobRoutes from './Routes/jobRoutes.js';



dotenv.config()

const app=express()



app.use(cors())
app.use(express.json())

connectDb()

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/jobs', jobRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const port =process.env.PORT || 3000


app.listen(port,()=>{


    console.log(`server connected http://localhost:${port}` );


    
})

