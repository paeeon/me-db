'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));
router.use('/user', require('./user'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
