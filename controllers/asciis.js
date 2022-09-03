const Ascii = require('../models/Ascii')

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
        try{
            await Ascii.create({ascii: req.body.asciiArt, userId: req.user.id})
            console.log('ASCII has been added!')
            res.redirect('/asciis')
        }catch(err){
            console.log(err)
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