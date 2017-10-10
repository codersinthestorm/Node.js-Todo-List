const express = require('express');
const todoController = require('C:/Users/Shivank/Desktop/NodeJS/node-js-playlist-master/controllers/todoController');
var app = express();

// set up ejs
app.set('view engine', 'ejs');

// static files (css sheets)
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to port 3000
app.listen(3000);
console.log('Listening to port 3000');
