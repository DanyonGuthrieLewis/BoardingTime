
var messageModel = require('../models/message');

var Message = messageModel.Message;
var messageSchema = messageModel.messageSchema;

exports.messages = function(req, res) {
    if(req.session.user == undefined){
        res.render('forum', {
            title: 'Main Forum',
            authorized: false,
            username: 'Taco',
            admin: false,
            avatar: null,
            messages: getMessages()
        });
    }
    else{
        res.render('forum', {
            title: 'Main Forum',
            authorized: true,
            username: req.session.user.username,
            admin: req.session.user.admin,
            avatar: req.session.user.avatar,
            messages: getMessages()
        });
    }
}

exports.messagePost = function(req, res) {
    var message = new Message({
        username: req.session.user.username,
        avatar: req.session.user.avatar,
        date: new Date().getDate(),
        text: req.body.message
    });
    message.save(function (err, user) {
        if (err) {
            return console.error(err);
        }
        else {
            console.log(message.username + ' posted ' + message.text);
        }
    });
    res.redirect('/');
}

function getMessages(){
    var messages = [
    {username: 'Taco',
    avatar: '285/abott@adorable.png',
    date: '1/1/1',
    text: 'This is a test message'},

    {username: 'Taco',
    avatar: '285/abott@adorable.png',
    date: '1/2/1',
    text: 'This is another test message'}

    ]
    
    var temp = Message.find({ 'text': '' }, 'username avatar date text', function (err, person) {
        if (err) 
        { 
            return handleError(err);
        }
        console.log('messages returned');
      });
    if(temp != null){
        messages == temp;
    }

    return messages;
}

function deleteMsg(message){
    
}