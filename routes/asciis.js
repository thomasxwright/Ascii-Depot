const express = require('express')
const router = express.Router()
const asciisController = require('../controllers/asciis') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, asciisController.getAsciis)

// Need to create a 'getImages" function to load images

router.post('/createAscii', asciisController.createAsciiArt)

router.post('/upload', asciisController.postImage)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteAscii', asciisController.deleteAscii)

module.exports = router