const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now()
    },
    description: String,
    adress: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    participants: [
        { 
            participant: {type: mongoose.Types.ObjectId, ref: 'User'},
            motivation: String
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);