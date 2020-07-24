const { Schema, model } = require('mongoose');

const ExamsModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topics: {
      type: String,
    },
    grade: {
      type: Int8Array,
    },
    guildId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Exams', ExamsModel);
