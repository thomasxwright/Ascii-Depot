const express = require('express')
const router = express.Router()
const asciisController = require('../controllers/asciis') 
const upload = require("../middleware/multer");
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, asciisController.getAsciis)

// Need to create a 'getImages" function to load images

router.get("/:id", ensureAuth, asciisController.getAsciis);

router.post('/createAscii', asciisController.createAsciiArt)

// router.post('/upload', asciisController.postImage)

router.post("/createPost", upload.single("file"), asciisController.createPost);

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteAscii', asciisController.deleteAscii)

module.exports = router