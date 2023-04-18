# Treasure Hunt
# How to create login and registration API in node.js.

## Node.js modules used in this
       "bcrypt-nodejs": "0.0.3", //A native JS bcrypt library for NodeJS.used for encrypt and decry-pt password.
       "body-parser": "^1.13.3", //parse body from all incoming requests
       "cookie-parser": "^1.3.5", //Parse Cookie header and populate req.cookies with an object keyed by the    cookie names
       "express": "^4.13.3", //Fast, unopinionated, minimalist web framework
   
       "mongoose": "^4.1.5", //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
       "nodemon": "^1.5.1"  //very usefull module, auto restart node sever after file changes.
       And some other modules like: passport-local,flash,session,path,dotenv

## Install
1. clone the branch
2. go to project directory
3. run command to install all required module npm install(make sure node is installed on your machine/server)
4. *run nodemon app.js will start your node server.*
5. *access http://localhost:3000*

## File Structure

app.js is main file when node starts, it do all checks here and load required module. 
