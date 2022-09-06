const express = require('express')
const session = require('express-session')
const Ascii = require('../models/Ascii')
const asciiImage = require('ascii-art-image')
const mongoose = require('mongoose')
const path = require('path')
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

require('dotenv').config({path: './config/.env'})



module.exports = {
    getAsciis: async (req,res)=>{
        console.log(req.user)
        try{
            const asciiPaintings = await Ascii.find({userId:req.user.id})
            res.render('asciis.ejs', {asciis: asciiPaintings, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    postImage: async (req, res)=>{
        try{
            const asciiPaintings = await Ascii.find({userId:req.user.id})
            const connection = mongoose.connect(process.env.DB_STRING)
            const storage = new GridFsStorage({
                 db: connection,
                 file: (req, file) => {
                    return {
                        filename: file.fieldname + '-' + Date.now()  + '-' + path.extname(file.originalname),
                        aliases: req.user.id
                    }
                 }
            });
              // Initialize Upload
            const upload = multer({
                storage: storage,
                limits:{fileSize: 5000000},
                fileFilter: function(req, file, cb){  // Filters Different Filetypes
                  checkFileType(file, cb);
                }
              }).single('image')

                // Check File Type
            function checkFileType(file, cb){
              // Allowed extensions
              const filetypes = /jpeg|jpg|png|gif|webp/
              // Check extension
              const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
              // Check mimetype
              const mimetype = filetypes.test(file.mimetype)
              if(mimetype && extname){
                return cb(null, true)
              }else{
                cb('Error Images Only. (.jpeg, .jpg, .png, .gif, and .webp are accepted filetypes.')
              }
            }

            // Upload is a function call from above to input the image into the databaase
            upload(req, res, (err) => {
                if(err){
                  res.render('asciis', {
                    msg: err,
                    user: req.user.id,
                    asciis: asciiPaintings
                  })
                  res.redirect('/asciis')
                }else{
                  res.render('asciis', {
                    msg: err,
                    user: req.user.id,
                    asciis: asciiPaintings
                  })
                }
              })
        }catch(err){
            console.log(err)
        }
    },
    createAsciiArt: async (req, res)=>{
        //declare variable for rendered ascii image
        let renderedImage
        
        //if text entry begins with "http", assume its an image link - no validation that its an image currently.
        if(req.body.asciiArt.startsWith("http")){
            //use ascii-art-image to generate ascii
            let image = new asciiImage({
                filepath: req.body.asciiArt.trim(),
                alphabet: 'variant3'
            });
            //this may be hacky, needed to use await in order to have renderedImage assigned by the time Ascii.create happens
            await image.write(function(err, rendered){
                 renderedImage = rendered
                 outputRender()
             })
            
            function outputRender() {
                console.log(renderedImage)
                try {
                    Ascii.create({ascii: renderedImage, completed: false, userId: req.user.id})
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
