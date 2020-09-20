const express = require("express");
const router = express.Router();

const OrderControllers = require("../conrollers/orders");

router.get("/", OrderControllers.orders_get_order);

router.get("/:orderId", OrderControllers.orders_get_order);

router.post("/", OrderControllers.create_order);

router.patch("/:productId", OrderControllers.update_order);

router.delete("/:orderId", OrderControllers.delete_order);

module.exports = router;
