const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: String,
    event: [{type: mongoose.Types.ObjectId, ref: 'Event'}]
})

module.exports = mongoose.model('User', userSchema);