const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./data').userDB;

dotenv.config();
const app = express();
const server = http.createServer(app);
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 })
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB database', error);
  });

  const COOKIE_SECRET = process.env.COOKIE_SECRET;
  app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  // require('./path/to/passport/config/file')(passport);
  require('./app/config/passport')(passport);
  app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, './public')));

app.use(flash());

app.get('/', (req, res) => {
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/', urlencodedParser, (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

app.use(bodyParser.urlencoded({extended:true}));
app.post('/play', (req, res) => {
  const key = req.body.key;
  console.log(req.body)
  // Validate the input
  if (!key || isNaN(key) || key != 54479) {
    res.sendFile(path.join(__dirname, './public/error.html'));
  } else {
    // Input is valid
    // Redirect to the result page
    res.sendFile(path.join(__dirname, './public/result.html'));
  }
});


require('./routes/web')(app, urlencodedParser);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}...`);
})