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
    res.send('todo');
}

exports.loginPost = function(req, res) {
    res.send('todo');
}

exports.profilePut = function(req, res) {
    res.send('todo')
}