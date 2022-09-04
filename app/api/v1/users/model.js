const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let userSchema = Schema(
  {
    name: {
      type: String,
      minlength: [6, "Minimum length name 6 character"],
      maxLength: [20, "Maximum length name 20 character"],
      required: [true, "Name can't be empty!"],
    },
    email: {
      type: String,
      required: [true, "Email can't be empty!"],
    },
    password: {
      type: String,
      minlength: [6, "Minimum length password 6 character"],
      maxLength: [20, "Maximum length password 20 character"],
      required: [true, "Password can't be empty!"],
    },
    role: {
      type: String,
      enum: ["admin", "owner", "organizer"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
