const { StatusCodes } = require("http-status-codes");
const {
  getAllEvents,
  createEvents,
  updateEvents,
  getOneEvents,
  deleteEvents,
  updateStatusEvent,
} = require("../../../services/mongo/events");

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const result = await updateStatusEvent(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, create, update, destroy, updateStatus };
