const express = require('express');
const router = express.Router();
const orderHandler = require('../handlers/orderHandler');
const jwtAuth = require('../middlewares/jwt');

router.post("/", jwtAuth, orderHandler.createOrder);
router.get("/", jwtAuth, orderHandler.getList);
router.get("/:id", jwtAuth, orderHandler.getOneByOrderId);
router.get('/customer_name/search', orderHandler.getByCustomerName);
router.put("/:id", jwtAuth, orderHandler.updateOrder);
router.delete("/:id", jwtAuth, orderHandler.deleteOrder);

module.exports = router;
