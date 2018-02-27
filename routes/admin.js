
var userModel = require('../models/user');

var User = userModel.User;
var userSchema = userModel.userSchema;


exports.getUsers = function(req, res) {

}

exports.getUser = function(req, res) {

}

exports.makeAdmin = function(req, res) {
    if (req.session.user) {
        User.findOne({'username': req.session.user.username}, 'username pass admin avatar email age', function (err, user) {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                if (user) {
                    user.admin = true;
                    user.save(function (err, updatedUser) {
                        if (err) return console.error(err);
                        console.log(updatedUser);
                    });
                } else {
                   res.redirect('/profile/edit')
                }
            }
        });
    } else {
        res.redirect('/');
    }
}

exports.deleteUser = function(req, res) {

}