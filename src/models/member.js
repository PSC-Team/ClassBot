const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    role: {
      type: String,
    },
    guilds_id: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('members', GuildSchema);
