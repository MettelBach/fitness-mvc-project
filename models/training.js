// models/training.js
const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    repetitions: {
        type: Number,
        required: true
    },
    intensity: {
        type: String
    }
})

module.exports = mongoose.model('Training', trainingSchema)
