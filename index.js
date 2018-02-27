var express = require('express'),
  pug = require('pug'),
  path = require('path'),
  admin = require('./routes/admin.js'),
  auth = require('./routes/auth.js'),
  forum = require('./routes/forum.js'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session');


var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

app.use(expressSession({
  secret: 'Whatever54321',
  saveUninitialized: true,
  resave: true
}));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', forum.messages);
app.get('/login', auth.login);
app.get('/logout', auth.logout);
app.get('/register', auth.register);
app.get('/profile/edit', auth.editProfile);
app.post('/register', urlencodedParser, auth.registerPost);
app.post('/login', urlencodedParser, auth.loginPost);
app.post('/', urlencodedParser, forum.messagePost);
app.post('/edit', urlencodedParser, forum.messageEdit);
app.post('/delete', urlencodedParser, forum.messageDelete);
app.post('/profile/edit', urlencodedParser, auth.editProfilePost);

//Admin routes
var checkAdmin = function(req, res, next) {
  if(req.session.user && req.session.user.admin){
    next();
  }else{
    res.redirect('/');
  }
}

app.get('/admin/users', checkAdmin, admin.getUsers);
app.get('/admin/user/:username', checkAdmin, admin.getUser);
app.get('/admin/make', admin.makeAdmin);
app.post('/admin/delete', urlencodedParser, checkAdmin, admin.deleteUser);

app.listen(3000);
