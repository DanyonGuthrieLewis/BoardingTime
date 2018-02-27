
var messageModel = require('../models/message');

var Message = messageModel.Message;
var messageSchema = messageModel.messageSchema;

exports.messages = function(req, res) {
    var resData;
    if(req.session.user == undefined){
        resData = {
            title: 'Main Forum',
            authorized: false,
            username: undefined,
            admin: false,
            avatar: null,
            messages: {}
        }
    }
    else{
        resData = {
            title: 'Main Forum',
            authorized: true,
            username: req.session.user.username,
            admin: req.session.user.admin,
            avatar: req.session.user.avatar,
            messages: {}
        }
    }
    getMessages(res, resData);
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

function getMessages(res, resData){
    var temp = [
    {username: 'Taco',
    avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    date: '1/1/1',
    text: 'This is a test message'},

    {username: 'Taco',
    avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png',
    date: '1/2/1',
    text: 'This is another test message'}
    ]
    Message.find(function (err, messages) {
        if (err)
        { 
            console.error(err);
        }
        else{
            console.log(messages);
            temp = messages;
        }
        resData.messages = temp;
        res.render('forum', resData);
    });

    
}

exports.messageEdit= function(req, res){
    var message = req.body.message
    //todo
    res.redirect("/");
}


exports.messageDelete = function(req, res){
    var message = {
        username: req.body.username,
        avatar: req.body.avatar,
        date: req.body.date,
        text: req.body.text
    }
    Message.findOneAndRemove(message, function (err, msg) {  
        if (err) {
            console.log(err);
        }
        console.log(message +'deleted');        
        return res.redirect('/');
    });
}