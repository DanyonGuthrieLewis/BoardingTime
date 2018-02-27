
var userModel = require('../models/user');

var User = userModel.User;
var userSchema = userModel.userSchema;


exports.getUsers = function(req, res) {
    res.send('todo');
}

exports.getUser = function(req, res) {
    res.send('todo');
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
    res.send('todo');
}