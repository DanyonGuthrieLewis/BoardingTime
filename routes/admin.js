
var userModel = require('../models/user');
var messageModel = require('../models/message');

var User = userModel.User;
var userSchema = userModel.userSchema;

var Message = messageModel.Message;
var messageSchema = messageModel.messageSchema;

exports.getUsers = function(req, res) {
    User.find(function (err, users) {
        if (err) {
            console.error(err);
            res.redirect('/');
        }
        console.log(users);

        for(let i = 0; i < users.length; i++) {
            users[i].profileURL = "./user/" + users[i].username;
        }
        res.render('users', { 
            'users': users 
        });
    });
}

exports.getUser = function(req, res) {
    User.findOne({'username': req.params.username}, 'username pass admin avatar email age', function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (user) {
                Message.find({'username': user.username}, function (err, messages) {
                    if (err) {
                        console.error(err);
                        res.send(err);
                    }
                    if (messages && messages.length > 0) {
                        res.render('profile', {
                            'user': user,
                            'hasMessages' : true,
                            'messages' : messages
                        });
                    } else {
                        res.render('profile', {
                            'user': user,
                            'hasMessages' : false,
                            'messages' : []
                        });
                    }
                });
            } else {
               res.redirect('/admin/users')
            }
        }
    });
}

exports.makeAdmin = function(req, res) {
    if (req.session.user) {
        User.findOne({'username': req.session.user.username}, 'username pass admin avatar email age', function (err, user) {
            if (err) {
                console.log(err)
                res.redirect('/')
            } else {
                if (user) {
                    user.admin = true;
                    req.session.user = user;
                    user.save(function (err, updatedUser) {
                        if (err) return console.error(err);
                        console.log(updatedUser);
                        res.redirect('/admin/users')
                    });
                } else {
                   res.redirect('/')
                }
            }
        });
    } else {
        res.redirect('/');
    }
}

exports.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.body.id, function (err, user) {
        if (err) {
            console.error(err);
            res.redirect('/admin/users');
        }
        res.redirect('/admin/users');
    });
}

exports.deleteMessage = function(req, res) {
    Message.findByIdAndRemove(req.body.id, function (err, message) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.redirect('/admin/user/' + req.body.username);
    });
}

