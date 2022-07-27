const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const APIv1 = "/api/v1";
const app = express();

const authCMSRouter = require("./app/api/v1/auth/router");
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentsRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");
const organizerRouter = require("./app/api/v1/organizer/router");
const ordersRouter = require("./app/api/v1/orders/router");
const participantsRouter = require("./app/api/v1/participants/router");

// middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`${APIv1}/cms`, authCMSRouter);
app.use(`${APIv1}/cms`, imagesRouter);
app.use(`${APIv1}/cms`, categoriesRouter);
app.use(`${APIv1}/cms`, talentsRouter);
app.use(`${APIv1}/cms`, eventsRouter);
app.use(`${APIv1}/cms`, organizerRouter);
app.use(`${APIv1}/cms`, ordersRouter);
app.use(APIv1, participantsRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
