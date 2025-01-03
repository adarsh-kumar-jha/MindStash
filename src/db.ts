import mongoose, {model, Schema} from "mongoose";
import {DB_URL} from "./config";
mongoose.connect(DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},

})

export const UserModel = model("User",UserSchema);


const ContentSchema = new Schema({
    title: String,
    link:  String,
    tags:[{type: mongoose.Types.ObjectId, ref: 'tag'}],
    userId: {type:mongoose.Types.ObjectId ,ref:'User', required: true},
    // authorId: {type:mongoose.Types.ObjectId ,ref:'User', required: true},
});

export const ContentModel = model("Content",ContentSchema);







