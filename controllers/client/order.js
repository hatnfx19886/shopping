const Order = require('../../models/Order');
const User = require('../../models/User');
const sgMail = require('@sendgrid/mail');
const Product = require('../../models/Product');

const api_key = process.env.SGMAIL_API_KEY;
sgMail.setApiKey(api_key);

exports.addOrder = (req, res, next) => {
  const email = req.body.user.email;
  const cart = req.body.cart.map((x) => {
    return {
      product: x.id,
      quantity: x.quantity,
    };
  });
  User.findOneAndUpdate({ email: email }, req.body.user)
    .then(() => {
      Order.create({
        user: req.query.userId,
        cart: cart,
        address: req.body.address,
        total: req.body.total,
        delivery: 'Waiting for progressing',
        status: 'Waiting for pay',
      })
        .then(() => {
          cart.forEach(async (x) => {
            try {
              await Product.findOneAndUpdate(
                { _id: x.product },
                { $inc: { count: -x.quantity } }
              );
            } catch (err) {
              console.log(err);
            }
          });
          sgMail
            .send({
              to: email,
              from: {
                name: 'Shop',
                email: 'hatnfx19886@funix.edu.vn',
              },
              subject: 'Your Order',
              html: `<div style='background-color: #000; color: #fff'; padding: 20px>
              <h1>Hello ${req.body.user.fullName}</h1>
          <p>Phone: ${req.body.user.phone}</p>
          <p>Address: ${req.body.address}</p>
          <table style='text-align: center'>
          <tr>
          <td style='border: 1px solid #fff; padding: 10px; width: 300px'>Name Product</td>
          <td style='border: 1px solid #fff; padding: 10px'>Image</td>
          <td style='border: 1px solid #fff; padding: 10px'>Price</td>
          <td style='border: 1px solid #fff; padding: 10px'>Quantity</td>
          <td style='border: 1px solid #fff; padding: 10px'>Total</td>
          </tr>
          ${req.body.cart
            .map(
              (x) => `<tr>
          <td style='border: 1px solid #fff; padding: 10px'>${x.name}</td>
          <td style='border: 1px solid #fff; padding: 10px'><img src=${
            x.src
          } alt width='120px' /></td>
          <td style='border: 1px solid #fff; padding: 10px'>${x.price.toLocaleString()} VND</td>
          <td style='border: 1px solid #fff; padding: 10px'>${x.quantity}</td>
          <td style='border: 1px solid #fff; padding: 10px'>${x.total.toLocaleString()} VND</td>
          </tr>`
            )
            .join('')}
          </table>
          <h1>Total Price:</h1>
          <h1>${req.body.total.toLocaleString()} VND</h1>
          <br />
          <h1>Thank you</h1></div>`,
            })
            .then(() => res.json({ message: 'Success' }))
            .catch((err) => console.log(err));
        })
        .catch((err) => res.status(400).json({ message: err.message }));
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

exports.findByUser = (req, res, next) => {
  Order.find({ user: req.query.userId })
    .sort({ updatedAt: -1 })
    .populate('user')
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};

exports.findById = (req, res, next) => {
  Order.findOne({ _id: req.params.id, user: req.query.userId })
    .populate(['user', 'cart.product'])
    .then((data) => res.json(data))
    .catch(() => res.status(500).json({ message: "Can't connect to server" }));
};
