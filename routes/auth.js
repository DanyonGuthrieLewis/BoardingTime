var bcrypt = require('bcrypt-nodejs');

var userModel = require('../models/user');

var myHash;
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
    var user = new User({
        username: req.body.username,
        pass: req.body.pass,
        admin: false,
        avatar: req.body.avatar
    });

    bcrypt.hash(user.pass, null, null, function(err, hash){
        if (err) {
            console.log(err);
            res.redirect('login');
        } else {
            user.pass = hash;
            user.save(function (err, user) {
                if (err) {
                    return console.error(err);
                }
                else {
                    console.log(user.username + ' added with pass ' + user.pass);
                }
            });
            res.redirect('/');
        }
    });    
}

exports.loginPost = function(req, res) {
    console.log(req.body)
    res.redirect('/login');
}

exports.profilePut = function(req, res) {
    res.send('todo')
}