import express from 'express';
import  {connectDB} from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoute from './routes/taskRoute.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

//middlewares
app.use(express.json());


const PORT = process.env.PORT || 8000;

connectDB();

app.use('/api/auth',authRoutes)
app.use('/api/task',taskRoute);

app.get('/',(req,res)=>{
  return res.send("hello wommmrld")
})
app.listen(PORT,()=>{
  console.log("server is running on port "+ PORT);
})