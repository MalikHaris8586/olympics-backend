const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true
    },
    sport: {
        type: String,
        required: true,
        trim: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Postponed'],
        default: 'Scheduled'
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
