
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
        date: new Date(),
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
            return res.status(500).send(err);
        }
        console.log(messages);
        if(messages.length != 0)
        {
            temp = messages;
        }
        resData.messages = temp;
        res.render('forum', resData);
    });

    
}

exports.messageEditPage = function(req, res){
    var message = {
        username: req.body.username,
        avatar: req.body.avatar,
        date: req.body.date,
        text: req.body.text
    }
    console.log(message.username +' Editing ' +message.text);
    res.render('edit-message', message);
}

exports.messageEditPost = function(req, res){
    var message = {
        username: req.body.username,
        avatar: req.body.avatar,
        date: req.body.date,
        text: req.body.text
    }
    var change = {
        username: req.body.username,
        avatar: req.body.avatar,
        date: req.body.date,
        text: req.body.newText
    }
    Message.findOneAndUpdate(message, change, function (err, msg) {
            if (err)
            { 
                console.log(err);
                return res.status(500).send(err);
            }
            console.log('Changing ' +message.text +' to ' +change.text);
            return res.redirect('/');
        });
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
            return res.status(500).send(err);
        }
        console.log(message +'deleted');        
        return res.redirect('/');
    });
}