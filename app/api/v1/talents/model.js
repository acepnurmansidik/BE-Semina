const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Speaker name can't empty!"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      require: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Organizer",
    },
  },
  { timestamp: true }
);

module.exports = model("Talent", talentSchema);
