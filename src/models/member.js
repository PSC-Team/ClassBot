const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    discord_id: {
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
