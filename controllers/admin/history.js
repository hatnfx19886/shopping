const Order = require('../../models/Order');

exports.dashboard = (req, res, next) => {
  Order.find()
    .sort({ updatedAt: -1 })
    .limit(8)
    .populate('user')
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};
