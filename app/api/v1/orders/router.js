const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const { index } = require("./controller");

router.get(
  "/orders",
  authenticateUser,
  authorizeRoles("owner", "admin", "organizer"),
  index
);

module.exports = router;
