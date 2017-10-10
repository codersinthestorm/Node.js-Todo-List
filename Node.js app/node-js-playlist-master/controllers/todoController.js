const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://shivank:shivank@ds115035.mlab.com:15035/todolist');

// var data = [{item: 'getmilk'}, {item: 'walkdog'}, {item: 'blazeit'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// create a schema (blueprint)
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
        app.get('/todo', function(req, res){
            Todo.find({}, function(err, data){
                if(err) throw err;
                res.render('todo', {todos: data});
            }); // finds all objects
        });
        app.post('/todo', urlencodedParser, function(req, res){
            // get data from view and add it to  mongoDB
            var newTodo = Todo(req.body).save(function(err, data){
                if(err) throw err;
                res.json(data);
            });            
        });
        app.delete('/todo/:item', function(req, res){
            // delete the requested item from mongoDB
            Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
                if(err) throw err;
                res.json(data);
            });
        });
};
