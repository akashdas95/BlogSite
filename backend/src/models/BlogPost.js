import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title:{
     type: String,
     required:true
    },
    imageURL:{
     type:String,
     required:false
    },
    description:{
     type: String,
     required: true
    },
    userOwner: {
     type:mongoose.Schema.Types.ObjectId,
     ref: "users",
     required: true  
    }
})

export const BlogPostModel = mongoose.model("blogPosts",BlogPostSchema);