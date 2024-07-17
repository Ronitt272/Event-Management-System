let mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    bio: String,
    friends: [{
        type: String
      }]
})

module.exports = new mongoose.model('user', userSchema);