const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const APIv1 = "/api/v1/cms";
const app = express();

const categoriesRouter = require("./app/api/v1/categories/router");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(APIv1, categoriesRouter);

module.exports = app;
