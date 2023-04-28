import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { blogPostsRouter } from './routes/BlogPost.js';
import { userRouter } from './routes/users.js';


const app = express();


app.use(express.json());
app.use(cors()); 
app.use("/auth", userRouter); 
app.use("/blogposts", blogPostsRouter);


mongoose.connect(`mongodb+srv://akash:robi01828480977@cluster-m.fq98e.mongodb.net/blogpost?retryWrites=true&w=majority`);


const port = 3001;


app.listen(port, ()=>{
    console.log(`backend is running`)
})
