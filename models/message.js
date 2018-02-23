var db = require('./db.js')

var messageSchema = db.mongoose.Schema({
    username: String,
    avatar: String,
    date: Date,
    text: String
});
  
var Message = db.mongoose.model('Message_Collection', messageSchema);

exports.messageSchema = messageSchema;
exports.Message = Message;