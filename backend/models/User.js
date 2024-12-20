const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    eventsOrganised: {
        type: [Schema.Types.ObjectId],
        ref: 'Events',
        default: []
    },
    eventsRegistered: {
        type: [Schema.Types.ObjectId],
        ref: 'Events',
        default: []
    }
});

const User = mongoose.model('User', userSchema);
module.exports = { User };

