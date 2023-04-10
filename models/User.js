const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'counselors'],
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
