const Product = require('../../models/Product');

exports.getAll = (req, res, next) => {
  Product.find()
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};

exports.getTrending = (req, res, next) => {
  Product.find()
    .limit(8)
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};

exports.getOne = (req, res, next) => {
  Product.find()
    .then((products) => {
      Product.findOne({ _id: req.params.id })
        .then((product) => {
          const relatedList = products.filter(
            (x) =>
              x.category === product.category &&
              x._id.toJSON() !== product._id.toJSON()
          );
          res.json({
            relatedList,
            product,
          });
        })
        .catch(() =>
          res.status(500).json({ message: "Can't connect to server" })
        );
    })
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};
