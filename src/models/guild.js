const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    professor: {
      type: String,
    },
    assistant: {
      type: String,
    },
    classroomId: {
      type: String,
      required: true,
    },
    students: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Guilds', GuildSchema);
