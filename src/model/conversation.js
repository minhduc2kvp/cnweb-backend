const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
  last_message: {
    is_read: {
      type: Number,
      default: 2 // 0 is send but not receive, 1 is send and received, 2 is read
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