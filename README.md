# ASCMii
https://ascmii.herokuapp.com/

---
A Full Stack Web Application that accepts hyperlinked images and converts them to ASCII art - After all, a picture is worth a thousand words.

Built using Node.js, MongoDB, and Express.js. Utilizes the MVC architecture. 


![example ascii output](https://i.ibb.co/6wX4f88/Screen-Shot-2022-09-06-at-3-50-22-PM.png)


---
# How to Use:
1. Install packages and dependencies.
2. Create .env file in the config/ folder with PORT number set, and DB_STRING to a MongoDB cluster.
3. Input text to save a note or a link to an image to generate an ASCII note.

---
# Install Node packages and dependencies used for development via the terminal:
`npm install` To run the server: `npm start`

---
# Packages / Dependencies used:
ascii-art-image, bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---
# Future functionality and features:
- Ability for the user to upload their own images. (partial functionality in place.)
- Adjust styling, and color palettes.
- Make application fully responsive by adding CSS Flexbox and CSS Grid.
