const Ascii = require('../models/Ascii')
const asciiImage = require('ascii-art-image')

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
