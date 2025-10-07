const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    sport: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    goldMedals: {
        type: Number,
        default: 0,
        min: 0
    },
    silverMedals: {
        type: Number,
        default: 0,
        min: 0
    },
    bronzeMedals: {
        type: Number,
        default: 0,
        min: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;
