const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
  last_message: {
    is_read: {
      type: Number,
      default: 2 // 0 da gui chua nhan 1 da gui da nhan chua doc 2 da gui da nhan da doc
    },
    kind: String,
    content: String,
    status: String,
    created: Date,
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  members: [
    { type: Schema.Types.ObjectId, ref: 'user' }
  ],
  messages: [{
    kind: String,
    content: String,
    status: {
      type: String,
      default: "sent"
    },
    created: Date,
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
  }],
  is_blocked: {
    type: String,
    default: "false"
  },
}, {
  timestamps: {}
});

module.exports = mongoose.model("conversation", conversationSchema);