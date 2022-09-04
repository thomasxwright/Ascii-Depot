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
        let renderedImage
        let entry = req.body.asciiArt
            
        if(req.body.asciiArt.startsWith("http")){

            let image = new asciiImage({
                filepath: req.body.asciiArt.trim(),
                alphabet: 'variant3'
            });
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
