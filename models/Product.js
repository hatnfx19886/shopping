const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: String,
      lowercase: true,
    },
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    long_desc: String,
    short_desc: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
