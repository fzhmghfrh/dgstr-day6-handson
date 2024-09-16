const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/userHandler');
const jwtAuth = require('../middlewares/jwt');

router.get('/', jwtAuth, userHandler.getAllUsers);
router.get('/:id', userHandler.getUser);
// router.post('/', userHandler.createUser);
router.post('/', userHandler.registUser);
router.put('/:id', userHandler.updateUser);
router.delete('/:id', userHandler.deleteUser);
router.get('/username/search', userHandler.searchUser);
router.post('/login', userHandler.loginUser);

module.exports = router;
