const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      minlength: [3, "Minimum length firstname 3 character"],
      maxLength: [50, "Maximum length firstname 50 character"],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
