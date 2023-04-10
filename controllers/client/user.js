const bcrypt = require('bcryptjs');
const User = require('../../models/User');

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: 'Your Email had been registed' });
      } else {
        bcrypt
          .hash(req.body.password, 12)
          .then((hash) => {
            User.create({
              fullName: req.body.fullName,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              role: 'user',
            })
              .then(() => res.json({ message: 'Success' }))
              .catch((err) =>
                res.status(500).json({ message: "Can't connect to server" })
              );
          })
          .catch((err) =>
            res.status(500).json({ message: 'Some thing went wrong' })
          );
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Can't connect to server" })
    );
};

exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).json({ message: 'Your email is not registered' });
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
          res.status(500).json({ message: 'Some thing went wrong' })
        );
    }
  });
};

exports.check = (req, res, next) => {
  User.findOne({ _id: req.query.userId })
    .then((data) => {
      if (data) {
        res.json(data);
      } else res.json(0);
    })
    .catch(() => res.json(0));
};
