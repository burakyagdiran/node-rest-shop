const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => console.log("error GET: ", err));
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .select("name price _id")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully",
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.update_product = (req, res, next) => {
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

exports.delete_product = (req, res, next) => {
  const id = req.params.productId;

  Product.deleteMany({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
