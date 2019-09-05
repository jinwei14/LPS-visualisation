const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.Port || 8081;
const logger = require('./middleware/logger');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const passport = require('passport');
//passport config
require('./config/passport')(passport);



// parse application/x-www-form-urlencoded for parsing the request body.
app.use(bodyParser.urlencoded({ extended: false }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());



//DB config
const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {useNewUrlParser : true } )
    .then(()=>console.log(" mongoDB is connected"))
    .catch(err=>console.log(err));

//init middleware
app.use(logger);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname,'public')));
// // Routes
app.use('/', require('./routes/login'));
app.use('/register', require('./routes/register'));


app.listen(PORT, console.log( `Server started on the port ${PORT}`));
