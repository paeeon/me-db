'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    approved: {
        type: Boolean
    }
});

mongoose.model('Question', schema);
