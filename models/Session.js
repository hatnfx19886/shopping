const { Schema, default: mongoose } = require('mongoose');

const sessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  messReq: [String],
  messRes: [String],
});

module.exports = mongoose.model('Session', sessionSchema);
