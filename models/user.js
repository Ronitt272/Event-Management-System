let mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String, 
    Password: password,
    name: String,
    bio: String,
    friends: [{
        type: String
      }],
    events: [{
      type: String
    }]
})

module.exports = new mongoose.model('user', userSchema);