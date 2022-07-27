const Orders = require("../../api/v1/orders/model");
const Participants = require("../../api/v1/participants/model");
const Events = require("../../api/v1/events/model");
const Payments = require("../../api/v1/payments/model");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../../errors");

const { createJWT } = require("../../utils");
const { otpMail } = require("../email");
const bcryptjs = require("bcryptjs");
const { createTokenParticipant } = require("../../utils");

const signupParticipant = async (req) => {
  const { firstname, lastname, email, password, role } = req.body;

  // jika email dan status tidak aktif
  let result = await Participants.findOne({ email, status: "tidak aktif" });

  if (result) {
    result.firstname = firstname;
    result.lastname = lastname;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random * 9999);

    await result.save();
  } else {
    result = await Participants.create({
      firstname,
      lastname,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  // send code OTP to email participant
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participants.findOne({ email });

  if (!check) throw new NotFoundError("Email not registered!");

  if (check && check.otp !== otp)
    throw new BadRequestError("The otp code you entered is wrong!");

  const result = await Participants.findOneAndUpdate(
    { _id: check._id },
    { status: "aktif" },
    { new: true }
  );

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide email and password");

  const result = await Participants.findOne({ email });

  if (!result) throw new UnauthorizedError("Invalid credentials");

  if (result && result.status === "tidak aktif")
    throw new UnauthorizedError("Your account is not active!");

  const isPasswordCorrect = await bcryptjs.compare(password, result.password);

  if (!isPasswordCorrect) throw new BadRequestError("Invalid credentials");

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async (req) => {
  const result = await Events.find({ statusEvent: "Published" })
    .populate([
      { path: "category", select: "name" },
      { path: "image", select: "name" },
    ])
    .select("_id title date tickets venueName")
    .lean();

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate([
      { path: "category", select: "name" },
      { path: "talent", select: "name role image" },
      { path: "image", select: "name" },
    ])
    .lean();

  if (!result) throw new NotFoundError(`Not events with id: ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

/**
 * Tugas send email invoice
 * TODO: Ambil data email dari personal detail
 */

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  const checkingEvent = await Events.findOne({ _id: event });

  // check Event
  if (!checkingEvent) throw new NotFoundError(`Not events with id: ${event}`);

  const checingPayment = await Payments.findOne({ _id: payment });

  // check Payment
  if (!checingPayment)
    throw new NotFoundError(`Not events with id: ${payment}`);

  let totalPay = 0,
    totalOrderTicket = 0;

  // looping jumlah tiket yang dibeli particpant
  await tickets.map((tic) => {
    // looping jumlah ticket tersedia di event tersebut
    checkingEvent.tickets.map((ticket) => {
      // check type ticket categoris for compare
      if (tic.ticketCategories.type === ticket.type) {
        /**
         * check stock available
         * jika tiket yang dibeli lebih banya dari yang tersedia maka akan error
         */
        if (tic.ticketCategories > ticket.stock) {
          throw new NotFoundError("Insufficient stock of event tickets");
        } else {
          // kurangi jumlah stock ticket
          ticket.stock = ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  // update jumlah stock
  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  // create orders
  const result = new Orders({
    date: new Date(),
    personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant._id,
    event,
    historyEvent,
    payment,
  });

  await result.save();

  return result;
};

module.exports = {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
};
