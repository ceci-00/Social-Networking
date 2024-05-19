// import express and apiRoutes
const router = require('express').Router();
const apiRoutes = require('./api');
// use apiRoutes for the /api endpoint
router.use('/api', apiRoutes);
// use this route for any other endpoint
router.use((req, res) => {
    res.status(404).send('Error 404. Wrong route!')
});

module.exports = router;