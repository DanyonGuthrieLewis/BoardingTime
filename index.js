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
app.get('/profile', auth.profile);
app.get('/profile/edit', auth.editProfile);
app.post('/register', urlencodedParser, auth.registerPost);
app.post('/login', urlencodedParser, auth.loginPost);
app.post('/', urlencodedParser, forum.messagePost)
<<<<<<< HEAD
app.post('/profile/edit', urlencodedParser, auth.editProfilePost)
=======
app.post('/edit', urlencodedParser, forum.messageEdit)
app.post('/delete', urlencodedParser, forum.messageDelete)
app.put('/profilePut', auth.profilePut)
>>>>>>> c8fd94742a49660f7a4534c80657c790b8133328

app.listen(3000);
