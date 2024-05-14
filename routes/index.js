// import express and apiRoutes
const router = require('express').Router();
const apiRoutes = require('./api');
// use apiRoutes for the /api endpoint
router.use('/api', apiRoutes);
// use this route for any other endpoint
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;