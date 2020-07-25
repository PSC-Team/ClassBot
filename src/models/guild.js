const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    professor: {
      type: String,
      required: true,
    },
    assistant: {
      type: String,
    },
    classInfo: {
      type: String,
    },
    classroomId: {
      type: String,
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
