var userModel = require('../models/user');

var User = userModel.User;
var userSchema = userModel.userSchema;

exports.login = function(req, res) {
    res.render('login');
}

exports.logout = function(req, res) {
    res.render('logout');
}

exports.register = function(req, res) {
    
    res.render('register');
}

exports.profile = function(req, res) {
    res.send('todo');
}

exports.editProfile = function(req, res) {
    res.send('todo');
}

exports.registerPost = function(req, res) {
    console.log(req)
    console.log(res)
    /*
    var user = new User({
        name: req.body.username,
        age: req.body.age,
        species: req.body.species
      });
    user.save(function (err, user) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
    });
    */
    res.redirect('/register');
}

exports.loginPost = function(req, res) {
    res.send('todo');
}

exports.profilePut = function(req, res) {
    res.send('todo')
}