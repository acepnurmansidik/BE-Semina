const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum length category name 3 character"],
      maxLength: [20, "Maximum length category name 20 character"],
      required: [true, "Name can't be empty!"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
