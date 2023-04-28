import express from "express";
import { BlogPostModel } from "../models/BlogPost.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";


const router = express();

router.get("/", async(req,res)=>{
    try{
      const response = await BlogPostModel.find({});
      res.json(response);
    }catch(err){
        res.json(err)
    }
})

router.post("/", verifyToken, async(req,res)=>{
    const blogPost = new BlogPostModel(req.body);

    try{
      const response = await blogPost.save();
      res.json(response);
    }catch(err){
        res.json(err)
    }
})


router.put("/", verifyToken, async(req,res)=>{
    try{
        const post = await BlogPostModel.findById(req.body.blogPostID);
        const user = await UserModel.findById(req.body.userID);
        user.savedPosts.push(post);
        await user.save();
        res.json({savedPosts: user.savedPosts});
    }catch(err){
        res.json(err)
    }
});

router.get("/savedPosts/ids/:userID", async(req,res)=>{
    try{
      const user = await UserModel.findById(req.params.userID);
      res.json({savedPosts: user?.savedPosts});
    }catch(err){
        res.json(err);
    }
})

router.get("/savedPosts/:userID", async(req,res)=>{
    try{
      const user = await UserModel.findById(req.params.userID);
      const savedPosts = await BlogPostModel.find({
        _id: { $in: user.savedPosts}
      })
      res.json({savedPosts});
    }catch(err){
        res.json(err);
    }
})


export { router as blogPostsRouter };

