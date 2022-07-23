const mongoose = require("mongoose");

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    require: [true, "Type cannot be empty!"],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  expired: {
    type: Date,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  event: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Event",
  },
});

let EventSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Title cannot be empty!"],
  },
  about: {
    type: String,
    require: [true, "About cannot be empty!"],
  },
  date: {
    type: Date,
    require: [true, "Date cannot be empty!"],
  },
  tagline: {
    type: String,
    require: [true, "Tagline cannot be empty!"],
  },
  keyPoint: {
    type: [String],
  },
  venueName: {
    type: String,
    require: [true, "The vanue cannot be empty!"],
  },
  statusEvent: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  image: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Image",
  },
  category: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Category",
  },
  talent: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Talent",
  },
  organizer: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "Organizer",
  },
  tickets: {
    type: [ticketCategoriesSchema],
    require: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
