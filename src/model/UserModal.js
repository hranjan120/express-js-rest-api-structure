const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModal = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userAddress: { type: String, default: '' },
  userStatus: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user_datas', UserModal);
