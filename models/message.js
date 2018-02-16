var db = require('./db.js')

exports.messageSchema = db.mongoose.Schema({
    user: String,
    avatar: String,
    date: Date,
    text: String
});
  
exports.Message = db.mongoose.model('Message_Collection', messageSchema);