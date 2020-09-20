const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity id")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => console.log("error GET: ", err));
};

exports.orders_get_order = (req, res, next) => {
  Order.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.update_order = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = req.body;

  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteMany({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
