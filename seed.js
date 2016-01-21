/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Question = Promise.promisifyAll(mongoose.model('Question'));

var seedQuestions = function () {

    var questions = [
        {
            text: 'What scares you?',
            category: ['personal'],
            approved: true
        },
        {
            text: 'Coffee or tea?',
            category: ['taste'],
            approved: true
        },
        {
            text: 'Have you ever shoplifted?',
            category: ['random'],
            approved: true
        },
        {
            text: 'Are you religious?',
            category: ['personal'],
            approved: true
        },
        {
            text: "Do your feet smell?",
            category: ['curveball'],
            approved: true
        },
        {
            text: 'Do you like answering questions?',
            category: ['curveball'],
            approved: true
        },
        {
            text: 'Is there someone standing behind you?',
            category: ['curveball'],
            approved: true
        },
        {
            text: "What's your favorite color?",
            category: ['taste'],
            approved: true
        },
        {
            text: 'Was it worth it?',
            category: ['curveball'],
            approved: true
        },
        {
            text: "What do you do in your free time?",
            category: ["personal"],
            approved: true
        },
        {
            text: "What's the craziest thing you've ever done?",
            category: ['personal'],
            approved: true
        },
        {
            text: "What color is your toothbrush?",
            category: ["random"],
            approved: true
        },
        {
            text: "When is the last time you showered?",
            category: ["random"],
            approved: true
        },
        {
            text: "Do you like chocolate?",
            category: ["random"],
            approved: true
        },
        {
            text: "Why is that man homeless?",
            category: ['child'],
            approved: true
        },
        {
            text: "Why don't we want others to see our private parts?",
            category: ['child'],
            approved: true
        },
        {
            text: "Why are there so many languages in the world?",
            category: ['child'],
            approved: true
        },
        {
            text: "Where did all the dinosaurs go?",
            category: ['child'],
            approved: true
        },
        {
            text: "Where do babies come from?",
            category: ['child'],
            approved: true
        },
        {
            text: 'What is God?',
            category: ['child'],
            approved: true
        },
        {
            text: 'Where do you come from?',
            category: ['child'],
            approved: true
        },
        {
            text: 'Do you identify with your heritage?',
            category: ['child', "personal"],
            approved: true
        }
    ];

    return Question.createAsync(questions);

};

connectToDb.then(function () {
    Question.findAsync({}).then(function (question) {
        if (question.length === 0) {
            return seedQuestions();
        } else {
            console.log(chalk.magenta('Seems to already be question data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
