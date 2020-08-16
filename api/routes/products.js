const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => console.log("error GET: ", err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST request to /products",
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (let ops of req.body) {
    updateOps[ops.propName] = ops.price;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
