const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    price: {
        type: String,
        requierd: true
    },
    url: {
        type: String,
        required: true
    },
    organiser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Events = mongoose.model('Events', eventSchema);
module.exports = { Events };