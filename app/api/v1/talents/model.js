const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Speaker name cannot empty!"],
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
  },
  { timestamp: true }
);

module.exports = model("Talent", talentSchema);
