/*
ASCMii - A Full Stack Web Application where users can sign up, display, and save ASCII art to their profile!
	- 
	- Erich Sabo
	- Eduardo Sanchez
	- Shivakumar Mahakali
*/


// Express Application. Require other Node Modules: mongoose, morgan, nodemon, and passport
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const asciiRoutes = require('./routes/asciis');

// set path for .env file:
require('dotenv').config( {path: './config/.env'} );

// passport config:
require('./config/passport')(passport);

// connect to the MongoDB:
// [Ensure that the DB_STRING in .env file is set to the proper MongoDB connection link. Ensure that it is of the type string.]
connectDB();

// set view structure as EJS, and enable reading and writing of JSON
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
)
	
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// routing to the main landing page, and the ASCII page once logged in
app.use('/', mainRoutes);
app.use('/asciis', asciiRoutes);


app.listen(process.env.PORT, () => {
	console.log("Starting server...");
	console.log("Server is running...");
})

/*
Full Stack structure:
	- This file, server.js is the main file. This is the entry point to the backend.
	- All API requests go through this file and then the router in the /routes/ folder.
	- General path:
		- (This file) server.js --> routes --> controllers --> views --> render page and display to user.
*/
