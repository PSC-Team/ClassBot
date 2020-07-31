const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    discordId: {
      type: String,
    },
    guildsId: [
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
