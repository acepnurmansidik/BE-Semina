const { StatusCodes } = require("http-status-codes");
const { getAllOrders } = require("../../../services/mongo/orders");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res
      .status(StatusCodes.OK)
      .json({
        data: { order: result.date, pages: result.pages, total: result.total },
      });
  } catch (err) {
    next(err);
  }
};

module.exports = { index };
