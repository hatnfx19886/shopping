const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user || user.role === 'user') {
        res.status(401).json({ message: 'Your account is unauthorized' });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              res.json(user);
            } else
              res.status(400).json({ message: 'Your password is incorrect' });
          })
          .catch(() =>
            res.status(400).json({ message: 'Some thing went wrong' })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.check = (req, res, next) => {
  User.findOne({ _id: req.query.userId })
    .then((data) => {
      if (!data || data.role === 'user') {
        res.json(0);
      } else res.json(data);
    })
    .catch(() => res.json(0));
};
