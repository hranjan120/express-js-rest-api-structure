const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');
/*
*-----------------------------Routes Section------------------------
*/
router.post('/v1/manage-user', userController.manageUser);
router.get('/v1/get-all-user', userController.getAllUser);

/*
*-----------------------------
*/
module.exports = router;
