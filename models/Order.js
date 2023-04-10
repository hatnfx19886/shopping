const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cart: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
    address: String,
    total: Number,
    delivery: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
