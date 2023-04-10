const User = require('../models/User');

exports.isLogin = (req, res, next) => {
  User.findOne({ _id: req.query.userId })
    .then((user) => {
      if (user) {
        next();
      } else res.status(401).json({ message: 'Unauthorized' });
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.isCounselors = (req, res, next) => {
  User.findOne({ _id: req.query.userId })
    .then((user) => {
      if (!user || user.role === 'user') {
        res.status(401).json({ message: 'Your account is unauthorized ' });
      } else next();
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.isAdmin = (req, res, next) => {
  User.findOne({ _id: req.query.userId })
    .then((user) => {
      if (user && user.role === 'admin') {
        next();
      } else res.status(401).json({ message: 'Your account is unauthorized ' });
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};
