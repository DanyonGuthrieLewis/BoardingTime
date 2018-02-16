var express = require('express'),
  pug = require('pug'),
  path = require('path'),
  admin = require('./routes/admin.js'),
  auth = require('./routes/auth.js'),
  forum = require('./routes/forum.js')
  bodyParser = require('body-parser');


var app = express();


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', forum.messages);


app.listen(3000);
