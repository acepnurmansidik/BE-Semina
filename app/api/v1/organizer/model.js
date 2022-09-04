const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Event organizer can't be empty!"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizersSchema);
