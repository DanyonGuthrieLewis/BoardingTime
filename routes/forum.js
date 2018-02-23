var userModel = require('../models/user');
var messageModel = require('../models/message');

exports.messages = function(req, res) {
    res.render('forum', {
        title: 'Main Forum',
        authorized: isAuth(),
        user: userModel.User,
        messages: getMessages()
    })
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
    var temp = messageModel.Message;
    if(temp != null){
        messages = temp;
    }
    return messages;
}

function isAuth(){
    if(userModel.User == null || userModel.User.username == ""){
        return false;
    }
    return true;
}