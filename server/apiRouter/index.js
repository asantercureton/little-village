const router = require('express').Router();
const gameRoutes = require('./gameRoutes');


router.use('/game', gameRoutes);

module.exports = router;