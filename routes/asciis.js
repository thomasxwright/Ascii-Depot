/*
Main router file for the URL route [ /asciis/ ]
    - ALL API requests for the URL of "/asciis/" will lead through this router file.
    - This router handles the: landing page for the asciis, create ascii, delete ascii, and uploading images
*/


// require Express, the asciis Controller and the passport.js auth
const express = require('express');
const router = express.Router();
const asciisController = require('../controllers/asciis');
const { ensureAuth } = require('../middleware/auth');


// APIs:
router.get('/', ensureAuth, asciisController.getAsciis);

router.post('/createAscii', asciisController.createAsciiArt);

router.post('/upload', asciisController.postImage);

router.delete('/deleteAscii', asciisController.deleteAscii);

// TODO:
// Need to create a 'getImages" function to load images


module.exports = router;

/*
Legacy Code:
    - // router.put('/markComplete', todosController.markComplete);
    - // router.put('/markIncomplete', todosController.markIncomplete);
*/
