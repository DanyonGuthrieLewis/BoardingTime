
exports.messages = function(req, res) {
    res.render('forum', {
        title: 'Main Forum',
        messages: getMessages()
    })
}

function getMessages(){
    var messages = [
    {user: 'Taco',
    avatar: '285/abott@adorable.png',
    date: '1/1/1',
    text: 'This is a test message'},

    {user: 'Taco',
    avatar: '285/abott@adorable.png',
    date: '1/2/1',
    text: 'This is another test message'}

    ]
    return messages
}