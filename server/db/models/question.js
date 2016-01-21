'use strict';
var mongoose = require('mongoose');

var categories = ["personal", "taste", "random", "curveball", "child"];

var schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    category: {
        type: String,
        enum: categories
    },
    approved: {
        type: Boolean
    }
});

mongoose.model('Question', schema);
