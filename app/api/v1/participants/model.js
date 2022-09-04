const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const participantSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      minlength: [3, "Minimum length firstname 3 character"],
      maxLength: [50, "Maximum length firstname 50 character"],
      required: [true, "Firstname can't be empty"],
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email can't be empty!"],
    },
    password: {
      type: String,
      minlength: [6, "Minimum length firstname 3 character"],
      maxLength: [50, "Maximum length firstname 50 character"],
      required: [true, "Email can't be empty!"],
    },
    role: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["aktif", "tidak aktif"],
      default: "tidak aktif",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

participantSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

participantSchema.method.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Participant", participantSchema);
