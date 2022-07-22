const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Event organizer cannot be empty!"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizersSchema);
