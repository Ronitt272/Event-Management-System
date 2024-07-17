let mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    time: Date,
    name: String,
    location: String,
    description: String,
    isPrivate: Boolean
})

module.exports = new mongoose.model('event', eventSchema);