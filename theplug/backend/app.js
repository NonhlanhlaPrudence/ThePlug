const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database/db_connnection');


// default options
var app = express();


// app use defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());


//routes declarations
const users_controllers = require('./controllers/users_controllers')
const skills_controllers = require('./controllers/skills_controllers')


//middleware routes that handles requests
app.use('/users', users_controllers);
app.use('/skills', skills_controllers);




module.exports = app;
