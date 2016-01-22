'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
<<<<<<< HEAD
router.use('/questions/', require('./questions'));
router.use('/answers/', require('./answers'))
=======
router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));
>>>>>>> master

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
