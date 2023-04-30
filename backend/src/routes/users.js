import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router();


router.post("/register", async(req, res)=>{
   const {username, password} = req.body;
   
   const user = await UserModel.findOne({ username });
   if(user){
    return res.json({message:"user already exist"});
   }

   const hashedPassword = await bcrypt.hash(password,10)

   const newUser = new UserModel({username,password:hashedPassword});
   await newUser.save();

   res.json({message:"user registered successfully"});
})


router.post("/login", async(req,res)=>{
    const {username, password} = req.body;

    if(!username){
        return res.json({message:"Please enter the user name"});
    }
    if(!password){
        return res.json({message:"Please enter the password"});
    }

    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"This user does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.json({message:"username and password is Incorrect"});
    }

    const token = jwt.sign({id:user._id}, "secret");
    res.json({token,username,userID: user._id});
})


export { router as userRouter };


export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"secret", (err)=>{
            if(err) return res.sendStatus(403);
            next();
        })
    }
    else{
        res.sendStatus(401);
    }
}

