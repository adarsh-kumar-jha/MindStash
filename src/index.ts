import express from "express";
// const express = require("express");
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import { UserModel } from "./db";

import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";


import { ContentModel } from "./db";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

 
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "Successfully signed up new User!!",
    });
  } catch (err) {
    res.status(411).json({
      message: "User Already Exists!!",
    });
  }
});
app.post("/api/v1/signin", async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
  
    const existingUser = await UserModel.findOne({
        username: username,
        password: password,
      });
    
      if (existingUser) {
        const token = jwt.sign(
          {
            id: existingUser._id,
          },
          JWT_PASSWORD
        );
    
        res.json({
          message: "Successfully signed in !!",
          token: token,
        });
      } else {
        res.status(403).json({
          message: "Invalid Credentials!!",
        });
      }
    
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {

    const link = req.body.link;
    const type = req.body.type;
  await ContentModel.create({
        link: link,
        type: type,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    })
    res.json({
        message:"Content Added!!"
    })
});

app.get("/api/v1/content",userMiddleware,async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
   const content = await ContentModel.find({userId:userId}).populate("userId","username");
   res.json(
    {content}
  );
});

app.delete("/api/v1/content",userMiddleware, async (req, res) => {
  const contentId= req.body.contentId;
   
  await ContentModel.deleteMany({
   
    contentId:contentId,
     //@ts-ignore
    userId: req.userId
  
  });

  res.json({
    message: "Content Deleted!!",

     });

});


app.post("/api/v1/share", (req, res) => {});

app.get("/api/v1/shareLink", (req, res) => {});

app.listen(3000);
