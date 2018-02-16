var db = require('./db.js')

exports.userSchema = db.mongoose.Schema({
    username: String,
    pass: String,
    avatar: String,
    admin: Boolean
});
  
exports.User = db.mongoose.model('User_Collection', userSchema);

