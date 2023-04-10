const Product = require('../../models/Product');

exports.getAllProduct = (req, res, next) => {
  Product.find()
    .sort({ updatedAt: -1 })
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};

exports.deleteProduct = (req, res, next) => {
  Product.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ message: 'Success' }))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};

exports.addProduct = (req, res, next) => {
  Product.create(req.body)
    .then(() => res.json({ message: 'Success' }))
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.updateProduct = (req, res, next) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ message: 'Success' }))
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};
