const express = require('express');
const router = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/*
    @description Root Route
    @method GET /
*/
router.get('/', services.homeRoutes)


/*
    @description add users
    @method GET /add-user
*/
router.get('/add-user', services.add_user);

/*
    @description for update user
    @method GET /update-user
*/
router.get('/update-user', services.update_user);

// API
router.post('/api/user', controller.create);
router.get('/api/user', controller.find);
router.put('/api/user/:id', controller.update);
router.delete('/api/user/:id', controller.delete);

module.exports = router;