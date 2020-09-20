const express = require("express");
const router = express.Router();

const ProductControllers = require("../conrollers/products");

router.get("/", ProductControllers.products_get_all);

router.get("/:productId", ProductControllers.products_get_product);

router.post("/", ProductControllers.create_product);

router.patch("/:productId", ProductControllers.update_product);

router.delete("/:productId", ProductControllers.delete_product);

module.exports = router;
