const router = require('express').Router();

const user_routes = require('./api/user_routes');
const characters_routes = require('./api/character_routes');

router.use('/api', [
    user_routes,
    characters_routes
]);

router.use('/auth', user_routes);

module.exports = router;
