const express = require('express')
const session = require('express-session')
const Ascii = require('../models/Ascii')
const asciiImage = require('ascii-art-image')
const mongoose = require('mongoose')
// const path = require('path')
const multer  = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

require('dotenv').config({path: './config/.env'})



module.exports = {
    getAsciis: async (req,res)=>{
        console.log(req.user)
        try{
            const asciiPaintings = await Ascii.find({userId:req.user.id})
            const imagePosts = await Post.findById(req.params.id);
            res.render('asciis.ejs', {asciis: asciiPaintings, user: req.user, posts: imagePosts})
        }catch(err){
            console.log(err)
        }
    },
    createPost: async (req, res) => {
      try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
  
        await Post.create({
          title: req.body.title,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user.id,
        });
        console.log("Post has been added!");
        res.redirect("/asciis");
      } catch (err) {
        console.log(err);
      }
    },
    createAsciiArt: async (req, res)=>{
        //if text entry begins with "http", assume its an image link - no validation that its an image currently.
        if(req.body.asciiArt.startsWith("http")){
            //use ascii-art-image to generate ascii from hyperlink submitted
            let image = new asciiImage({
                filepath: req.body.asciiArt.trim(),
                alphabet: 'variant3'
            });
            //this may be hacky, needed to use await in order to have renderedImage assigned by the time Ascii.create happens
            await image.write(function(err, rendered){
                 outputRender(rendered)
             })
            
            function outputRender(renderedAscii) {
                console.log(renderedAscii)
                try {
                    Ascii.create({ascii: renderedAscii, completed: false, userId: req.user.id})
                    console.log('Ascii has been added!')
                    res.redirect('/asciis')
                } catch (err) {
                    console.log(err)
                 }
            }
        }else{
                //if entry is not a hyperlink, just save as a note
                try{
                    await Ascii.create({ascii: req.body.asciiArt, completed: false, userId: req.user.id})

                    console.log('Ascii has been added!')
                    res.redirect('/asciis')
                }catch(err){
                    console.log(err)
                }   
        }
    },
    deleteAscii: async (req, res)=>{
        console.log(req.body.asciiId)
        try{
            await Ascii.findOneAndDelete({_id:req.body.asciiId})
            console.log('Deleted Ascii')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
