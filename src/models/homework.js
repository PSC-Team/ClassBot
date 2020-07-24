const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    name: {
      type: String,
    },
    server_id: {
      type: String,
    },
    description: {
      type: String,
    },
    assign_date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('homeworks', GuildSchema);
