const express = require('express');
const router = express.Router();

const UserController = require('../modules/account/controller/UserController');

router.post('/add', UserController.addUser);
router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.delete('/:id', UserController.deteleUserById);
router.patch('/:id', UserController.updateUserById);
router.post('/login', UserController.userLogin);

module.exports = router;