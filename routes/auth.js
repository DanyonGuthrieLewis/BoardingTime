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
    User.findOne({'username': req.body.username}, 'username pass admin avatar', function (err, existinguser) {
        if (err) {
            console.log(err)
            res.redirect('/login')
        } else {
            if (existinguser) {
                console.log(req.body.username, "already exists");
                res.redirect('/register');
            } else {
                bcrypt.hash(req.body.pass, null, null, function(err, hash){
                    if (err) {
                        console.log(err);
                        res.redirect('/register');
                    } else {
                        var user = new User({
                            username: req.body.username,
                            pass: hash,
                            admin: false,
                            avatar: req.body.avatar
                        });
                       
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
        }
    });
}

exports.loginPost = function(req, res) {

    User.findOne({'username': req.body.username}, 'username pass admin avatar', function (err, user) {
        if (err) {
            console.log(err)
            res.redirect('/login')
        } else {
            if (user) {
                bcrypt.compare(req.body.pass, user.pass, function(err, success) {
                    if (err) {
                        res.redirect('/login');
                    } else {
                        if (success) {
                            req.session.user = {
                                isAuthenticated: true,
                                username: user.username,
                                avatar: user.avatar,
                                admin: user.admin
                              };
                            res.redirect('/');
                        } else {
                            res.redirect('/login');
                        }
                    }
                }); 
            } else {
                console.log(req.body.username, 'does not exist')
                res.redirect('/login');
            }
        }
    });
}

exports.profilePut = function(req, res) {
    res.send('todo')
}