const mongoose = require("mongoose");

let orderDetailSchema = new mongoose.Schema({
  ticketCategory: {
    type: {
      type: String,
      required: [true, "Ticket type can't be empty!"],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  historyEvent: {
    title: {
      type: String,
      require: [true, "Title can't be empty!"],
    },
    about: {
      type: String,
      require: [true, "About can't be empty!"],
    },
    date: {
      type: Date,
      require: [true, "Date can't be empty!"],
    },
    tagline: {
      type: String,
      require: [true, "Tagline can't be empty!"],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      require: [true, "The vanue can't be empty!"],
    },
    tickets: {
      type: [],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "IMage",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: "Talent",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  personalDetail: {
    firstname: {
      type: String,
      required: [true, "Please provide firstname!"],
      minlength: [3, "Minimum length firstname 3 character"],
      maxLength: [50, "Maximum length firstname 50 character"],
    },
    lastname: {
      type: String,
      required: [true, "Please provide lastname!"],
      minlength: [3, "Minimum length lastname 3 character"],
      maxLength: [50, "Maximum length lastname 50 character"],
    },
    email: {
      type: String,
      required: [true, "Please provide email!"],
    },
    role: {
      type: String,
      default: "Designer",
    },
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  totalPay: {
    type: Number,
    required: true,
  },
  totalOrderTicket: {
    type: Number,
    required: true,
  },
  orderItems: [orderDetailSchema],
  participant: {
    type: mongoose.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  payment: {
    type: mongoose.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
