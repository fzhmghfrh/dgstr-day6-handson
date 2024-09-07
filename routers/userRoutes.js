const express = require('express');
const router = express.Router();
const userHandlers = require('../handlers/userHandlers');
const jwtAuth = require('../middlewares/jwt');

router.get('/', jwtAuth, userHandlers.getAllUsers);
router.get('/:id', userHandlers.getUser);
// router.post('/', userHandlers.createUser);
router.post('/', userHandlers.registUser);
router.put('/:id', userHandlers.updateUser);
router.delete('/:id', userHandlers.deleteUser);
router.get('/username/search', userHandlers.searchUser);
router.post('/login', userHandlers.loginUser);

module.exports = router;
