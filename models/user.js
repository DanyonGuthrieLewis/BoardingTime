var db = require('./db.js')

var userSchema = db.mongoose.Schema({
    username: String,
    pass: String,
    avatar: String,
    admin: Boolean
});
  
var User = db.mongoose.model('User_Collection', userSchema);

exports.userSchema = userSchema;
exports.User = User;